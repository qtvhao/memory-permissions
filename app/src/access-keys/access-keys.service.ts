import { Injectable } from '@nestjs/common';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccessKeysService {
  private accessKeys = []; // Mảng lưu trữ Access Keys trong RAM

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
}
