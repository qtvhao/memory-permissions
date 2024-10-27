import { Controller, Post, Body } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';
import { CheckPermissionDto } from './dto/check-permission.dto';

@Controller('access-keys')
export class AccessKeysController {
  constructor(private readonly accessKeysService: AccessKeysService) {}

  @Post('create')
  createAccessKey(@Body() createAccessKeyDto: CreateAccessKeyDto) {
    return this.accessKeysService.createAccessKey(createAccessKeyDto);
  }

  @Post('check-permission')
  checkPermission(@Body() checkPermissionDto: CheckPermissionDto) {
    return this.accessKeysService.checkPermission(checkPermissionDto);
  }
}
