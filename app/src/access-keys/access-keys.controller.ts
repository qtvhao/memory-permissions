import { Controller, Post, Get, Body } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';
import { CreateAccessKeyDto } from './dto/create-access-key.dto';

@Controller('access-keys')
export class AccessKeysController {
  constructor(private readonly accessKeysService: AccessKeysService) {}

  @Post('create')
  createAccessKey(@Body() createAccessKeyDto: CreateAccessKeyDto) {
    return this.accessKeysService.createAccessKey(createAccessKeyDto);
  }

}
