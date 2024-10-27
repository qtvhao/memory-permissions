import { Controller, Post, Get, Body } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('assign')
  assignPermission(@Body() assignPermissionDto: AssignPermissionDto) {
    return this.permissionsService.assignPermission(assignPermissionDto);
  }
}
