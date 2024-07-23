import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.BROKER_1],
      },
      consumer: {
        groupId: process.env.TOPIC_DEVICE_INFO,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(4000);
}
bootstrap();
