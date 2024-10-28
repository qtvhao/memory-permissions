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
  @ApiOperation({ summary: 'Create a new access key' })
  @ApiResponse({ status: 201, description: 'The access key has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({ schema: { example: { user_id: 'user123', description: 'My new access key' } } })
  createAccessKey(@Body() createAccessKeyDto: CreateAccessKeyDto) {
    return this.accessKeysService.createAccessKey(createAccessKeyDto);
  }

  @Post('check-permission')
  @ApiOperation({ summary: 'Check access key permission for a resource' })
  @ApiResponse({ status: 200, description: 'Permission check result.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBody({
    schema: {
      example: {
        access_key_id: 'access_key_id',
        secret_access_key: 'secret_access_key',
        permission: 'read',
        resource: 'doc456',
      },
    },
  })
  checkPermission(@Body() checkPermissionDto: CheckPermissionDto) {
    return this.accessKeysService.checkPermission(checkPermissionDto);
  }
}
