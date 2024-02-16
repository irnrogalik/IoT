import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProducerService } from './producer/producer.service';
import { ConfigService } from '@nestjs/config';
import { Message } from 'kafkajs';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly producerService: ProducerService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    const deviceNumber = this.configService.get<number>('DEVICE_NUMBER');
    const interval = this.configService.get<number>('INTERVAL');
    setInterval(async () => {
      for (let i = 0; i < deviceNumber; i++) {
        await this.sendMessage(this.getInfoFromDevice(this.getRandomId()));
      }
    }, interval);
  }

  async sendMessage(messages): Promise<void> {
    await this.producerService.produce({
      topic: this.configService.get<string>('TOPIC_SENSOR'),
      messages,
    });
  }

  getInfoFromDevice(deviceId: string): Message[] {
    return [
      {
        key: 'battery',
        value: JSON.stringify({
          deviceId,
          sensorId: this.getRandomId(),
          charge: this.getRandomId(100),
        }),
        timestamp: Date.now().toString(),
      },
      {
        key: 'location',
        value: JSON.stringify({
          deviceId,
          sensorId: this.getRandomId(),
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
