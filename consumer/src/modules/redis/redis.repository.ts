import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisRepository implements OnModuleDestroy {
  constructor(@Inject('redis') private readonly clientRedis: Redis) {}

  onModuleDestroy(): void {
    this.clientRedis.disconnect();
  }

  async get(prefix: string, key: string): Promise<string | null> {
    return this.clientRedis.get(`${prefix}:${key}`);
  }

  async set(prefix: string, key: string, value: string): Promise<void> {
    await this.clientRedis.set(`${prefix}:${key}`, value);
  }

  async delete(prefix: string, key: string): Promise<void> {
    await this.clientRedis.del(`${prefix}:${key}`);
  }

  async getAllKeys(prefix: string): Promise<any> {
    return await this.clientRedis.keys(`${prefix}:*`);
  }
}
