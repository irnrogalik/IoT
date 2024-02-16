import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Partitioners, Producer, ProducerRecord } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  constructor(private configService: ConfigService) {}

  private readonly kafka = new Kafka({
    brokers: [this.configService.get<string>('BROKER_1')],
  });
  private readonly producer: Producer = this.kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
  });

  async onModuleInit(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (error) {
      console.log('Error connecting the producer: ', error);
    }
  }

  async produce(message: ProducerRecord): Promise<void> {
    try {
      await this.producer.send(message);
    } catch (error) {
      console.log('Error sending the message: ', error);
    }
  }

  async onApplicationShutdown(): Promise<void> {
    try {
      await this.producer.disconnect();
    } catch (error) {
      console.log('Error disconnecting the producer: ', error);
    }
  }
}
