import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisRepository implements OnModuleDestroy {
  constructor(@Inject('redis') private readonly clientRedis: Redis) {}

  onModuleDestroy(): void {
    this.clientRedis.disconnect();
  }

  async get(prefix: string, key: string): Promise<string[]> {
    return await this.clientRedis.lrange(`${prefix}:${key}`, 0, -1);
  }

  async set(prefix: string, key: string, value: string): Promise<void> {
    await this.clientRedis.rpush(`${prefix}:${key}`, value);
  }

  async delete(prefix: string, key: string): Promise<void> {
    await this.clientRedis.del(`${prefix}:${key}`);
  }

  async flush(): Promise<void> {
    const result = await this.clientRedis.flushall();
    console.log('flush result', result);
  }

  async getAllKeys(prefix: string): Promise<any> {
    return await this.clientRedis.keys(`${prefix}:*`);
  }
}
