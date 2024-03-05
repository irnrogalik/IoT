import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ConsumerModule } from '../consumer/consumer.module';

@Module({
  imports: [ConsumerModule],
  exports: [DeviceService],
  providers: [DeviceService],
})
export class DeviceModule {}
