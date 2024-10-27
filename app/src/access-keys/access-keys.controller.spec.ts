import { Test, TestingModule } from '@nestjs/testing';
import { AccessKeysController } from './access-keys.controller';

describe('AccessKeysController', () => {
  let controller: AccessKeysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessKeysController],
    }).compile();

    controller = module.get<AccessKeysController>(AccessKeysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
