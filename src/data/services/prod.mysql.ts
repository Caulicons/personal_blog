import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'roundhouse.proxy.rlwy.net',
      port: 34916,
      username: 'root',
      password: 'jnpdHrbWuYVVvShmeKMhZWefoYROqatB',
      database: 'railway',
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}

/* @Injectable()
export class ProdService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.MYSQLHOST,
      port: parseInt(process.env.MYSQLPORT),
      username: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      synchronize: true,
      autoLoadEntities: true,
    };
  }
} */
