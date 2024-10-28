import { Test, TestingModule } from '@nestjs/testing';
import { AccessKeysController } from './access-keys.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AccessKeysService } from './access-keys.service';

// Run npx jest app/src/access-keys/access-keys.controller.spec.ts to test
describe('AccessKeysController', () => {
  let app: INestApplication;
  let accessKeysService = { createAccessKey: jest.fn(), getUserByAccessKeyPair: jest.fn() };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AccessKeysController],
      providers: [{ provide: AccessKeysService, useValue: accessKeysService }],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an access key', () => {
    const createAccessKeyDto = { user_id: 'user123', description: 'My new access key' };
    accessKeysService.createAccessKey.mockResolvedValue(createAccessKeyDto);

    return request(app.getHttpServer())
      .post('/access-keys/create')
      .send(createAccessKeyDto)
      .expect(201)
      .expect(createAccessKeyDto);
  });

  it('should get user by access key pair', () => {
    const accessKeyPair = { access_key_id: 'access_key_id', secret_access_key: 'secret_access_key' };
    const user = { id: 'user123', name: 'John Doe' };
    accessKeysService.getUserByAccessKeyPair.mockResolvedValue(user);

    return request(app.getHttpServer())
      .post('/access-keys/get-user')
      .send(accessKeyPair)
      .expect(201)
      .expect(user);
  });
});
