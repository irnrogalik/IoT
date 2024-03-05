import { Injectable } from '@nestjs/common';
import { ConsumerService } from '../consumer/consumer.service';
import { SensorInfo } from './device.interface';
import { ConsumerSubscribeTopics } from 'kafkajs';

@Injectable()
export class DeviceService {
  constructor(private consumerService: ConsumerService) {}

  getDeviceInfo(topics: ConsumerSubscribeTopics) {
    this.consumerService.consume(topics, {
      eachMessage: async ({ message }) => {
        const sensorInfo: SensorInfo = {
          sensorType: message.key.toString(),
          deviceInfo: JSON.parse(message.value.toString()),
          timestamp: message.timestamp,
        };
        console.log(sensorInfo);
      },
    });
  }
}
