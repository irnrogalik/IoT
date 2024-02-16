import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProducerModule } from './producer/producer.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProducerModule, ConfigModule.forRoot()],
  providers: [AppService],
})
export class AppModule {}
