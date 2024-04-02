import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from './modules/device/device.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [DeviceModule, RedisModule, ConfigModule.forRoot()],
})
export class AppModule {}
