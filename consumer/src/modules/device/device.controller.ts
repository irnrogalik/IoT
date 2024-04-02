import { Controller, OnModuleInit } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { DeviceInfo } from './device.interface';
import { DeviceService } from './device.service';

@Controller()
export class DeviceController implements OnModuleInit {
  constructor(private deviceService: DeviceService) {}

  onModuleInit() {
    this.getAllDeviceKeys();
  }

  @EventPattern('deviceInfo')
  async getDeviceInfo(data: any) {
    for (const d of data) {
      const deviceInfo: DeviceInfo = {
        deviceId: d.key,
        sensorInfo: JSON.parse(d.value),
        timestamp: d.timestamp,
      };
      console.log(`device id ${deviceInfo.deviceId}`);
      this.deviceService.saveDeviceInfo(deviceInfo);
      const device = await this.deviceService.getDeviceInfoById(
        deviceInfo.deviceId,
      );
      console.log(JSON.parse(device));
    }
  }

  async getAllDeviceKeys() {
    const devices = await this.deviceService.getAllDeviceKeys();
    console.log(devices);
  }
}
