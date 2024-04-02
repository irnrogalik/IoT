import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { RedisModule } from '../redis/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RedisModule, ConfigModule],
  controllers: [DeviceController],
  exports: [DeviceService],
  providers: [DeviceService],
})
export class DeviceModule {}
