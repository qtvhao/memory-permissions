import { Injectable } from '@nestjs/common';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@Injectable()
export class PermissionsService {
  private permissions = []; // Mảng lưu trữ quyền trong RAM

  assignPermission(assignPermissionDto: AssignPermissionDto) {
    const { user, permission, resource } = assignPermissionDto;

    // Tạo đối tượng quyền
    const newPermission = {
      user,
      permission,
      resource,
      assigned_at: new Date().toISOString(),
    };

    // Lưu quyền vào mảng permissions
    this.permissions.push(newPermission);

    return {
      status: 'success',
      message: 'Permission assigned successfully',
      permission: newPermission,
    };
  }

  // Phương thức kiểm tra quyền
  hasPermission(user: string, permission: string, resource: string): boolean {
    return this.permissions.some(
      (perm) => perm.user === user && perm.permission === permission && perm.resource === resource,
    );
  }
}
