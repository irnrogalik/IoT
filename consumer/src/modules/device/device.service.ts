import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { DeviceInfo } from './device.interface';
import { ConfigService } from '@nestjs/config';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';

@Injectable()
export class DeviceService {
  constructor(
    private redisService: RedisService,
    private configService: ConfigService,
  ) {}
  private tablePrefix = this.configService.get<string>('DEVICE_TABLE_PREFIX');
  private registry = new SchemaRegistry({ host: 'http://localhost:8081/' });

  async getDeviceInfo(data: any): Promise<DeviceInfo> {
    const decodedData = await this.registry.decode(data);
    const deviceInfo: DeviceInfo = {
      deviceId: decodedData.key,
      sensorInfo: JSON.parse(decodedData.value),
      timestamp: decodedData.timestamp,
    };
    return deviceInfo;
  }

  async saveDeviceInfo(deviceInfo: DeviceInfo): Promise<void> {
    await this.redisService.save(
      this.tablePrefix,
      deviceInfo.deviceId,
      JSON.stringify(deviceInfo),
    );
  }

  async getDeviceInfoById(deviceId: string): Promise<string[]> {
    return await this.redisService.get(this.tablePrefix, deviceId);
  }

  async getAllDeviceKeys(): Promise<any> {
    return await this.redisService.getAllKeys(this.tablePrefix);
  }

  async removeByKey(id): Promise<any> {
    return await this.redisService.delete(this.tablePrefix, id);
  }

  async flush(): Promise<void> {
    return await this.redisService.flush();
  }
}
