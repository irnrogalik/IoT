import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumerSubscribeTopics } from 'kafkajs';
import { DeviceService } from './modules/device/device.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly deviceService: DeviceService,
    private configService: ConfigService,
  ) {}

  onModuleInit() {
    const topics: ConsumerSubscribeTopics = {
      topics: [this.configService.get<string>('TOPIC_SENSOR')],
    };
    this.deviceService.getDeviceInfo(topics);
  }
}
