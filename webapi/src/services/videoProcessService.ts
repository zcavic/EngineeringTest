import * as Amqp from 'amqp-ts';
import { UploadedFileData, FileData } from '../model/video';
import { collections } from '../repository/FileDatabase';
import { ObjectId } from 'mongodb';

export class VideoProcessService {
  private connection: Amqp.Connection;
  constructor(amqpUrl: string) {
    this.connection = new Amqp.Connection(amqpUrl);
    const exchange = this.connection.declareExchange('WebApi');
    const resultQueue = this.connection.declareQueue('Result');
    resultQueue.bind(exchange);
    resultQueue.activateConsumer(this.messageHandler.bind(this));
  }

  async messageHandler(message: Amqp.Message): Promise<void> {
    console.log(`WebApi received message: ${message.getContent()}`);
    const fileData = JSON.parse(message.getContent()) as UploadedFileData;
    switch (fileData.processingStatus) {
      case 'ScanDone': {
        const exchange = this.connection.declareExchange('EditService');
        const newMessage = new Amqp.Message(JSON.stringify(fileData));
        exchange.send(newMessage);
        console.log('WebApi sent message to EditService.');
        break;
      }
      case 'EditDone': {
        const exchange = this.connection.declareExchange('PrepareService');
        const newMessage = new Amqp.Message(JSON.stringify(fileData));
        exchange.send(newMessage);
        console.log('WebApi sent message to PrepareService.');
        break;
      }
      case 'PrepareDone': {
        const exchange = this.connection.declareExchange('FinishService');
        const newMessage = new Amqp.Message(JSON.stringify(fileData));
        exchange.send(newMessage);
        console.log('WebApi sent message to FinishService.');
        break;
      }
      case 'FinishDone': {
        console.log('Process is finished.');
        break;
      }
      default: {
        console.log(
          `[WARNING] The message: ${message.getContent()} can't be processed.`
        );
        return;
      }
    }
    await this.updateDatabase(fileData);
    message.ack();
  }

  async updateDatabase(fileData: UploadedFileData): Promise<void> {
    const query = { _id: new ObjectId(fileData.id) };
    await collections.fileData?.updateOne(query, {
      $set: fileData as FileData,
    });
  }

  processVideo(fileData: UploadedFileData): void {
    const message = new Amqp.Message(JSON.stringify(fileData));
    const exchange = this.connection.declareExchange('ScanService');
    exchange.send(message);
    console.log('WebApi sent message ' + message.getContent());
  }
}
