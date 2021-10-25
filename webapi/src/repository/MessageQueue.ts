import * as Amqp from 'amqp-ts';

class MessageQueue {
  private connection: Amqp.Connection;
  private handler: (n: string) => Promise<void>;

  constructor(exchangeName: string, queueName: string, messageHandler: (n: string) => Promise<void>) {
    this.connection = new Amqp.Connection(process.env.MESSAGE_QUEUE);
    const exchange = this.connection.declareExchange(exchangeName);
    const resultQueue = this.connection.declareQueue(queueName);
    resultQueue.bind(exchange);
    resultQueue.activateConsumer(this.messageHandler.bind(this));
    this.handler = messageHandler;
  }

  public send(exchangeName: string, message: string): void {
    const queueMessage = new Amqp.Message(message);
    const exchange = this.connection.declareExchange(exchangeName);
    exchange.send(queueMessage);
  }

  private async messageHandler(message: Amqp.Message): Promise<void> {
    await this.handler(JSON.parse(message.getContent()));
  }
}

export default MessageQueue;
