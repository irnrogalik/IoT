import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.BROKER_1],
        },
        consumer: {
          groupId: process.env.TOPIC_DEVICE_INFO,
        },
      },
    },
  );
  app.listen();
}
bootstrap();
