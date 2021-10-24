import { Queue } from './queue';

export class Consumer extends Queue {
  async consume(queueName: string): Promise<void> {
    try {
      console.log('Trying yo start consumer.');
      await this.channel().assertQueue(queueName, { durable: true });
      this.channel().consume(
        queueName,
        (message) => {
          const input = JSON.parse(message.content.toString());
          console.log(`Received job with input ${input}`);
          this.channel().ack(message);
        },
        {
          // manual acknowledgment mode,
          // see ../confirms.html for details
          noAck: false,
        }
      );
      console.log('Waiting for messages...');
    } catch (ex) {
      console.error(ex);
    }
  }
}
