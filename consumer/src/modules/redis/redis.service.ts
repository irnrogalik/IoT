import { Injectable } from '@nestjs/common';
import { RedisRepository } from './redis.repository';

@Injectable()
export class RedisService {
  constructor(private readonly redisRepository: RedisRepository) {}

  async save(prefix: string, id: string, value: string): Promise<void> {
    await this.redisRepository.set(prefix, id, value);
  }

  async get(prefix: string, id: string): Promise<string[]> {
    return await this.redisRepository.get(prefix, id);
  }

  async delete(prefix: string, id: string): Promise<void> {
    await this.redisRepository.delete(prefix, id);
  }

  async getAllKeys(prefix: string): Promise<any> {
    return await this.redisRepository.getAllKeys(prefix);
  }

  async flush(): Promise<void> {
    return await this.redisRepository.flush();
  }
}
