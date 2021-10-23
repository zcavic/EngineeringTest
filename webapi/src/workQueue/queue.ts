import amqpConMgr, {
  AmqpConnectionManager,
  ChannelWrapper,
} from 'amqp-connection-manager';

export class Queue {
  protected connections: AmqpConnectionManager[];
  protected channels: ChannelWrapper[];

  constructor() {
    this.connections = [];
    this.channels = [];
  }
  async connect(): Promise<void> {
    try {
      console.log('Trying to connect.');
      const connection = amqpConMgr.connect(['amqp://localhost']);
      //const connection = amqpConMgr.connect(['amqp://rabbitmq']);
      //const connection = amqpConMgr.connect([process.env.MESSAGE_QUEUE]);
      console.log('Trying to create chanel.');
      const channel = await connection.createChannel();
      console.log('Trying to assert queue.');
      await channel.assertQueue('jobs');
      this.connections.push(connection);
      this.channels.push(channel);
      console.log('Connected.');
    } catch (ex) {
      console.error(ex);
    }
  }
  async disconnect(): Promise<void> {
    try {
      for (const connection of this.connections) {
        await connection.close();
      }
      for (const channel of this.channels) {
        await channel.close();
      }
      console.log('Chanel and channel are closed.');
    } catch (ex) {
      console.error(ex);
    }
  }
}
