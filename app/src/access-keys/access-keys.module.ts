import { Module } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { AccessKeysController } from './access-keys.controller';
import { PermissionsModule } from '../permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PermissionsModule, UsersModule],
  providers: [AccessKeysService],
  controllers: [AccessKeysController]
})
export class AccessKeysModule {}
