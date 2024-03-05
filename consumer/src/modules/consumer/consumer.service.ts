import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  constructor(private configService: ConfigService) {}

  private readonly kafka = new Kafka({
    brokers: [this.configService.get<string>('BROKER_1')],
  });
  private readonly consumers: Consumer[] = [];
  private readonly consumer: Consumer = this.kafka.consumer({
    groupId: this.configService.get<string>('TOPIC_SENSOR'),
  });

  async consume(topics: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    await this.consumer.connect();
    await this.consumer.subscribe(topics);
    await this.consumer.run(config);
    this.consumers.push(this.consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
