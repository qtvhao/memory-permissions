import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AccessKeysModule } from './access-keys/access-keys.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [UsersModule, AccessKeysModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
