import * as Amqp from 'amqp-ts';

export class VideoProcessService {
  private connection: Amqp.Connection;
  private queueName: string;
  constructor(amqpUrl: string, serviceName: string, queueName: string) {
    this.connection = new Amqp.Connection(amqpUrl);
    this.queueName = queueName;
    const exchange = this.connection.declareExchange(serviceName);
    const resultQueue = this.connection.declareQueue(queueName);
    resultQueue.bind(exchange);
    resultQueue.activateConsumer(this.messageHandler.bind(this));
    console.log(
      `${serviceName} is started and queue ${queueName} is established `
    );
  }

  messageHandler(message: Amqp.Message): void {
    console.log(
      `${this.queueName}Service received message: ${message.getContent()}`
    );
    setTimeout(() => {
      this.processVideo(message);
    }, 5000);
  }

  processVideo(message: Amqp.Message): void {
    const video = {
      title: JSON.parse(message.getContent()).title,
      status: JSON.parse(message.getContent()).status,
    };
    video.status = this.queueName + 'Done';
    message.ack();
    const newMessage = new Amqp.Message(JSON.stringify(video));
    const exchange = this.connection.declareExchange('WebApi');
    exchange.send(newMessage);
    console.log('WebApi sent message ' + newMessage.getContent());
    console.log(
      `${this.queueName}Service sent message: ${newMessage.getContent()}`
    );
  }
}
