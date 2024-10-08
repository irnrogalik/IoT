import { Controller, Get, Param } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { DeviceService } from './device.service';
import { ConfigService } from '@nestjs/config';

@Controller('device')
export class DeviceController {
  constructor(
    private deviceService: DeviceService,
    private configService: ConfigService,
  ) {}
  private tablePrefix = this.configService.get<string>('DEVICE_TABLE_PREFIX');

  @EventPattern('deviceInfo')
  async getDeviceInfo(data: any) {
    const deviceInfo = await this.deviceService.getDeviceInfo(data);
    console.log(`device id ${deviceInfo.deviceId}`);
    this.deviceService.saveDeviceInfo(deviceInfo);
  }

  @Get()
  async getAllDeviceKeys() {
    let result = [];
    const devices = await this.deviceService.getAllDeviceKeys();
    if (devices) {
      const keys = devices.map((d) => {
        d = d.replace(`${this.tablePrefix}:`, '');
        return d;
      });
      result = [...new Set(keys)];
    }
    return result;
  }

  @Get(':id')
  async getInfoByKey(@Param('id') id: string) {
    const info = await this.deviceService.getDeviceInfoById(id);
    return JSON.stringify(info);
  }
}
