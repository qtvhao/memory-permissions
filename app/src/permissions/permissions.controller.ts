import { Controller, Post, Get, Body } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AssignPermissionDto } from './dto/assign-permission.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('assign')
  @ApiOperation({ summary: 'Assign permission to a user' })
  @ApiResponse({ status: 201, description: 'Permission assigned successfully.' })
  @ApiBody({ schema: { example: { user: 'user_id', permission: 'read', resource: 'doc456' } } })
  assignPermission(@Body() assignPermissionDto: AssignPermissionDto) {
    return this.permissionsService.assignPermission(assignPermissionDto);
  }
}
