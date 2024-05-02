import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { afterAll, beforeEach, describe, test } from 'vitest';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController', () => {
  let app: INestApplication;
  let userID: any;
  let token: any;
  const user = {
    username: 'romario',
    email: 'romario@romario.com',
    password: 'romario123',
    photo:
      'https://s2.glbimg.com/xaPAFYp26YTQxjVu59OFcNJMky8=/top/e.glbimg.com/og/ed/f/original/2021/02/18/romario-4.jpg',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db.sqlite',
          synchronize: true,
          autoLoadEntities: true,
          dropSchema: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User Module Tests.', async () => {
    test('01 - create a user', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/create')
        .send(user)
        .expect(201);

      userID = res.body.id;
    });

    test('02- Not can duplicate', async () => {
      return await request(app.getHttpServer())
        .post('/users/create')
        .send(user)
        .expect(400);
    });

    test('03 - Authenticated user', async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: user.username,
          password: user.password,
        })
        .expect(200);

      token = res.body.access_token;
    });

    test('04 - List all Users', async () => {
      return request(app.getHttpServer())
        .get('/users/')
        .set('Authorization', `${token}`)
        .send({})
        .expect(200);
    });

    test('05 - Update user', async () => {
      return request(app.getHttpServer())
        .put('/user/')
        .set('Authorization', `${token}`)
        .send({
          id: userID,
          username: user.username,
          email: user.email,
          password: user.password,
        })
        .expect(200)
        .then((res) => {
          expect('Root Atualizado').toEqual(res.body.nome);
        });
    });
  });
});