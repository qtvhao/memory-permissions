import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AccessKeysService } from './access-keys.service';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';
import { CheckPermissionDto } from './dto/check-permission.dto';

@ApiTags('access-keys')
@Controller('access-keys')
export class AccessKeysController {
  constructor(private readonly accessKeysService: AccessKeysService) {}

  @Post('create')
  createAccessKey(@Body() createAccessKeyDto: CreateAccessKeyDto) {
    return this.accessKeysService.createAccessKey(createAccessKeyDto);
  }

  @Post('check-permission')
  @ApiOperation({ summary: 'Check access key permission for a resource' })
  @ApiResponse({ status: 200, description: 'Permission check result.' })
  @ApiBody({ schema: { example: { access_key_id: 'key_id', secret_access_key: 'secret_key', permission: 'read', resource: 'doc456' } } })
  checkPermission(@Body() checkPermissionDto: CheckPermissionDto) {
    return this.accessKeysService.checkPermission(checkPermissionDto);
  }
}
