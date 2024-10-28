import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';
import { v4 as uuidv4 } from 'uuid';
import { CheckPermissionDto } from './dto/check-permission.dto';
import { PermissionsService } from '../permissions/permissions.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AccessKeysService {
  private accessKeys = []; // Mảng lưu trữ Access Keys trong RAM
  constructor(private readonly permissionsService: PermissionsService, private readonly usersService: UsersService) {}

  createAccessKey(createAccessKeyDto: CreateAccessKeyDto) {
    const { user_id, description } = createAccessKeyDto;

    const newAccessKey = {
      user_id,
      access_key_id: uuidv4(), // Tạo ID ngẫu nhiên cho access key
      secret_access_key: uuidv4(), // Tạo secret key ngẫu nhiên
      created_at: new Date().toISOString(),
      expires_at: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
      description,
    };

    // Lưu Access Key vào mảng accessKeys
    this.accessKeys.push(newAccessKey);

    return {
      status: 'success',
      message: 'Access key created successfully',
      access_key: newAccessKey,
    };
  }

  // Phương thức kiểm tra quyền
  checkPermission(checkPermissionDto: CheckPermissionDto) {
    const { access_key_id, secret_access_key, permission, resource } = checkPermissionDto;

    // Kiểm tra xem Access Key có hợp lệ không
    const accessKey = this.accessKeys.find(
      (key) => key.access_key_id === access_key_id && key.secret_access_key === secret_access_key,
    );

    if (!accessKey) {
      return {
        status: 'success',
        has_permission: false,
        message: `Invalid access key or secret key`,
      };
    }

    // Kiểm tra quyền trong PermissionsService
    const hasPermission = this.permissionsService.hasPermission(
      accessKey.user_id,
      permission,
      resource,
    );

    if (hasPermission) {
      return {
        status: 'success',
        has_permission: true,
        message: `Access granted for ${permission} permission on resource ${resource}`,
      };
    } else {
      return {
        status: 'success',
        has_permission: false,
        message: `Access denied for ${permission} permission on resource ${resource}`,
      };
    }
  }

  // Phương thức lấy thông tin người dùng bằng cặp access key
  getUserByAccessKeyPair(accessKeyId: string, secretAccessKey: string) {
    const accessKey = this.accessKeys.find(
      key => key.access_key_id === accessKeyId && key.secret_access_key === secretAccessKey
    );

    if (!accessKey) {
      throw new NotFoundException('Access key pair not found.');
    }

    return this.usersService.getUserById(accessKey.user_id);
  }
}
