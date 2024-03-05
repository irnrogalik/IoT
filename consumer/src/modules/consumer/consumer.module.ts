import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class ConsumerModule {}
