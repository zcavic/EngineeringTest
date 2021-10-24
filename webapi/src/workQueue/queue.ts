import amqpConMgr, { ChannelWrapper } from 'amqp-connection-manager';

export class Queue {
  private channels: ChannelWrapper[];

  constructor() {
    this.channels = [];
  }
  channel(): ChannelWrapper {
    return this.channels[0];
  }
  async connect(): Promise<void> {
    try {
      console.log('Trying to connect.');
      const connection = amqpConMgr.connect(['amqp://localhost']);
      //const connection = amqpConMgr.connect(['amqp://rabbitmq']);
      //const connection = amqpConMgr.connect([process.env.MESSAGE_QUEUE]);
      console.log('Trying to create chanel.');
      const channel = connection.createChannel();
      this.channels.push(channel);
      console.log('Connected.');
    } catch (ex) {
      console.error(ex);
    }
  }
  async disconnect(): Promise<void> {
    try {
      for (const channel of this.channels) {
        await channel.close();
      }
      console.log('Chanel and channel are closed.');
    } catch (ex) {
      console.error(ex);
    }
  }
}
