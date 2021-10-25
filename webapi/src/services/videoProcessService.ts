import { Connection, Message } from 'amqp-ts';
import { UploadedFileData } from '../model/FileData';
import IFileRepo from '../repository/IFileRepo';
import IVideoProcessService from './IVideoProcessService';

class VideoProcessService implements IVideoProcessService {
  private connection: Connection;
  private fileRepo: IFileRepo;
  constructor(fileRepo: IFileRepo, connection: Connection) {
    this.connection = connection;
    this.fileRepo = fileRepo;
    const exchange = this.connection.declareExchange('WebApi');
    const resultQueue = this.connection.declareQueue('Result');
    resultQueue.bind(exchange);
    resultQueue.activateConsumer(this.messageHandler.bind(this));
  }

  private async messageHandler(message: Message): Promise<void> {
    console.log(`WebApi received message: ${message.getContent()}`);
    const fileData = JSON.parse(message.getContent()) as UploadedFileData;
    switch (fileData.processingStatus) {
      case 'ScanDone': {
        const exchange = this.connection.declareExchange('EditService');
        const newMessage = new Message(JSON.stringify(fileData));
        exchange.send(newMessage);
        console.log('WebApi sent message to EditService.');
        break;
      }
      case 'EditDone': {
        const exchange = this.connection.declareExchange('PrepareService');
        const newMessage = new Message(JSON.stringify(fileData));
        exchange.send(newMessage);
        console.log('WebApi sent message to PrepareService.');
        break;
      }
      case 'PrepareDone': {
        const exchange = this.connection.declareExchange('FinishService');
        const newMessage = new Message(JSON.stringify(fileData));
        exchange.send(newMessage);
        console.log('WebApi sent message to FinishService.');
        break;
      }
      case 'FinishDone': {
        console.log('Process is finished.');
        break;
      }
      default: {
        console.log(`[WARNING] The message: ${message.getContent()} can't be processed.`);
        return;
      }
    }

    await this.fileRepo.updateFileData(fileData);

    message.ack();
  }

  public processVideo(fileData: UploadedFileData): void {
    const message = new Message(JSON.stringify(fileData));
    const exchange = this.connection.declareExchange('ScanService');
    exchange.send(message);
    console.log('WebApi sent message ' + message.getContent());
  }
}

export default VideoProcessService;
