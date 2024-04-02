import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { DeviceInfo } from './device.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DeviceService {
  constructor(
    private redisService: RedisService,
    private configService: ConfigService,
  ) {}
  private tablePrefix = this.configService.get<string>('DEVICE_TABLE_PREFIX');

  async saveDeviceInfo(deviceInfo: DeviceInfo): Promise<void> {
    await this.redisService.save(
      this.tablePrefix,
      deviceInfo.deviceId,
      JSON.stringify(deviceInfo),
    );
  }

  async getDeviceInfoById(deviceId: string): Promise<string> {
    return await this.redisService.get(this.tablePrefix, deviceId);
  }

  async getAllDeviceKeys(): Promise<any> {
    return await this.redisService.getAllKeys(this.tablePrefix);
  }
}
