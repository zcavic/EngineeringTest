import * as Amqp from 'amqp-ts';
import { IVideo } from '../model/video';

export class VideoProcessService {
  private connection: Amqp.Connection;
  constructor() {
    this.connection = new Amqp.Connection('amqp://localhost');
    const exchange = this.connection.declareExchange('WebApi');
    const resultQueue = this.connection.declareQueue('Result');
    resultQueue.bind(exchange);
    resultQueue.activateConsumer(this.messageHandler.bind(this));
  }

  messageHandler(message: Amqp.Message): void {
    console.log(`WebApi received message: ${message.getContent()}`);
    const video = {
      title: JSON.parse(message.getContent()).title,
      status: JSON.parse(message.getContent()).status,
    };
    switch (video.status) {
      case 'ScanDone': {
        const exchange = this.connection.declareExchange('EditService');
        const newMessage = new Amqp.Message(JSON.stringify(video));
        exchange.send(newMessage);
        console.log('WebApi sent message to EditService.');
        break;
      }
      case 'EditDone': {
        const exchange = this.connection.declareExchange('PrepareService');
        const newMessage = new Amqp.Message(JSON.stringify(video));
        exchange.send(newMessage);
        console.log('WebApi sent message to PrepareService.');
        break;
      }
      case 'PrepareDone': {
        const exchange = this.connection.declareExchange('FinishService');
        const newMessage = new Amqp.Message(JSON.stringify(video));
        exchange.send(newMessage);
        console.log('WebApi sent message to FinishService.');
        break;
      }
      case 'FinishDone': {
        console.log('Process is finished.');
        break;
      }
      default: {
        //statements;
        return;
      }
    }
    message.ack();
  }

  processVideo(vide: IVideo): void {
    const message = new Amqp.Message(JSON.stringify(vide));
    const exchange = this.connection.declareExchange('ScanService');
    exchange.send(message);
    console.log('WebApi sent message ' + message.getContent());
  }
}
