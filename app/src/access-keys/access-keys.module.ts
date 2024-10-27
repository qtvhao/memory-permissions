import { Module } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { AccessKeysController } from './access-keys.controller';

@Module({
  providers: [AccessKeysService],
  controllers: [AccessKeysController]
})
export class AccessKeysModule {}
