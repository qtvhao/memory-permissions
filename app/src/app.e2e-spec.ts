// src/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('User Flow - Create User, Access Key, Assign Permission, Check Permission (e2e)', () => {
  let app: INestApplication;
  let user_id: string;
  let access_key_id: string;
  let secret_access_key: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Step 1: Create a User', async () => {
    const createUserResponse = await request(app.getHttpServer())
      .post('/users/create')
      .send({
        user_id: 'user123',
        name: 'John Doe',
        email: 'johndoe@example.com',
        attributes: {
          department: 'engineering',
          role: 'developer',
        },
      })
      .expect(201);

    expect(createUserResponse.body.status).toBe('success');
    expect(createUserResponse.body.message).toBe('User created successfully');
    expect(createUserResponse.body.user).toBeDefined();

    // Store user_id for next steps
    user_id = createUserResponse.body.user.user_id;
  });

  it('Step 2: Create an Access Key for the User', async () => {
    const createAccessKeyResponse = await request(app.getHttpServer())
      .post('/access-keys/create')
      .send({
        user_id,
        description: 'Access key for API access',
      })
      .expect(201);

    expect(createAccessKeyResponse.body.status).toBe('success');
    expect(createAccessKeyResponse.body.message).toBe('Access key created successfully');
    expect(createAccessKeyResponse.body.access_key).toBeDefined();

    // Store access_key_id and secret_access_key for next steps
    access_key_id = createAccessKeyResponse.body.access_key.access_key_id;
    secret_access_key = createAccessKeyResponse.body.access_key.secret_access_key;
  });

  it('Step 3: Assign Read Permission for Resource doc456', async () => {
    const assignPermissionResponse = await request(app.getHttpServer())
      .post('/permissions/assign')
      .send({
        user: user_id,
        permission: 'read',
        resource: 'doc456',
      })
      .expect(201);

    expect(assignPermissionResponse.body.status).toBe('success');
    expect(assignPermissionResponse.body.message).toBe('Permission assigned successfully');
    expect(assignPermissionResponse.body.permission).toBeDefined();
  });

  it('Step 4: Check Access Key Permission for Reading doc456', async () => {
    const checkPermissionResponse = await request(app.getHttpServer())
      .post('/access-keys/check-permission')
      .send({
        access_key_id,
        secret_access_key,
        permission: 'read',
        resource: 'doc456',
      })
      .expect(201);

    expect(checkPermissionResponse.body.status).toBe('success');
    expect(checkPermissionResponse.body.has_permission).toBe(true);
    expect(checkPermissionResponse.body.message).toBe('Access granted for read permission on resource doc456');
  });
});
