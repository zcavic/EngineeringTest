import * as Amqp from 'amqp-ts';

export class ScanService {
  private connection: Amqp.Connection;
  constructor() {
    this.connection = new Amqp.Connection('amqp://localhost');
    const exchange = this.connection.declareExchange('scanService');
    const scanQueue = this.connection.declareQueue('scan');
    scanQueue.bind(exchange);
    scanQueue.activateConsumer(this.messageHandler);
  }

  messageHandler(message: Amqp.Message): void {
    console.log('ScanService received message: ' + message.getContent());
  }

  sendMessage(): void {
    const message = new Amqp.Message('Test 2');
    const exchange = this.connection.declareExchange('WebApi');
    exchange.send(message);
    console.log('ScanService sent message: ' + message.getContent());
  }
}
