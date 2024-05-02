import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Personal Blog')
    .setDescription('My Blog personal')
    .setContact(
      'Vítor Oliveira. (@Caulicons)',
      'https://github.com/Caulicons',
      'caulicons.jobs@gmail.com',
    )
    .setVersion('0.0000000001')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
