import { Queue } from './queue';

export class Consumer extends Queue {
  async consume(): Promise<void> {
    try {
      console.log('Trying yo start consumer.');
      this.channels[0].consume('jobs', (message) => {
        const input = JSON.parse(message.content.toString());
        console.log(`Received job with input ${input}`);
        this.channels[0].ack(message);
      });
      console.log('Waiting for messages...');
    } catch (ex) {
      console.error(ex);
    }
  }
}
