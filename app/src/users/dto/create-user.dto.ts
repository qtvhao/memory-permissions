// src/users/dto/create-user.dto.ts
export class CreateUserDto {
    user_id: string;
    name: string;
    email: string;
    attributes: {
      department: string;
      role: string;
    };
}
