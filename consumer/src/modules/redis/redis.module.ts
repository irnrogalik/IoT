import { Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';
import { RedisRepository } from './redis.repository';

@Module({
  providers: [
    {
      provide: 'redis',
      useFactory: (): Redis => {
        const redisInstance = new Redis({
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
        });
        redisInstance.on('error', (e) => {
          throw new Error(`Redis connection failed: ${e}`);
        });
        return redisInstance;
      },
    },
    RedisService,
    RedisRepository,
  ],
  exports: [RedisService],
})
export class RedisModule {}
