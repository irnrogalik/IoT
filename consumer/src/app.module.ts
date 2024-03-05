import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from './modules/device/device.module';

@Module({
  imports: [DeviceModule, ConfigModule.forRoot()],
  providers: [AppService],
})
export class AppModule {}
