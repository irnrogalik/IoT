import {
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';
import { Message } from 'kafkajs';
import {
  SchemaRegistry,
  SchemaType,
  readAVSCAsync,
} from '@kafkajs/confluent-schema-registry';
@Injectable()
export class AppService implements OnModuleInit, OnApplicationShutdown {
  constructor(
    private configService: ConfigService,
    @Inject('KAFKA_SERVICE') private clientKafka: ClientKafka,
  ) {}

  async onModuleInit() {
    const deviceNumber = this.configService.get<number>('DEVICE_NUMBER');
    const interval = this.configService.get<number>('INTERVAL');
    const topic = this.configService.get<string>('TOPIC_DEVICE_INFO');

    const registry = new SchemaRegistry({ host: 'http://localhost:8081' });
    const schema = await readAVSCAsync('./src/schema.avsc');
    const { id } = await registry.register({
      type: SchemaType.AVRO,
      schema: JSON.stringify(schema),
    });

    this.clientKafka.subscribeToResponseOf(topic);
    await this.clientKafka.connect();

    setInterval(async () => {
      for (let i = 0; i < deviceNumber; i++) {
        const deviceId = this.getRandomId(10);
        const deviceInfo = this.getInfoFromDevice(deviceId);
        for (const info of deviceInfo) {
          const encodedMessage = await registry.encode(id, info);
          this.sendMessage(topic, encodedMessage);
        }
        console.log(`device info ${deviceId} has been sent`);
      }
    }, interval);
  }

  async onApplicationShutdown() {
    await this.clientKafka.close();
  }

  async sendMessage(topic: string, data: Buffer): Promise<void> {
    this.clientKafka.emit(topic, data);
  }

  getInfoFromDevice(deviceId: string): Message[] {
    return [
      {
        key: deviceId,
        value: JSON.stringify({
          sensorId: this.getRandomId(),
          sensorType: 'battery',
          charge: this.getRandomId(100),
        }),
        timestamp: Date.now().toString(),
      },
      {
        key: deviceId,
        value: JSON.stringify({
          sensorId: this.getRandomId(),
          sensorType: 'location',
          location: this.getRandomLocation(-180, 180, 6),
        }),
        timestamp: Date.now().toString(),
      },
    ];
  }

  getRandomId(max: number = 1000): string {
    return Math.floor(Math.random() * max).toString();
  }

  getRandomLocation(from, to, fixed): string[] {
    return [
      (Math.random() * (to - from) + from).toFixed(fixed),
      (Math.random() * (to - from) + from).toFixed(fixed),
    ];
  }
}
