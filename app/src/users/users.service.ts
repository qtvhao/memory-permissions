import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = []; // Mảng lưu trữ người dùng trong RAM

  createUser(createUserDto: CreateUserDto) {
    const { user_id, name, email, attributes } = createUserDto;
    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = this.users.find((user) => user.user_id === user_id);
    if (existingUser) {
      return {
        status: 'error',
        message: 'User already exists',
      };
    }

    // Tạo đối tượng người dùng
    const newUser = {
      user_id,
      name,
      email,
      attributes,
    };

    // Lưu người dùng vào mảng users
    this.users.push(newUser);

    return {
      status: 'success',
      message: 'User created successfully',
      user: {
        user_id,
        name,
        email,
      },
    };
  }

  // Thêm một phương thức để lấy tất cả người dùng
  getAllUsers() {
    return this.users;
  }
}
