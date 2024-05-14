import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('My Blog')
    .setDescription(
      'My personal blog, made while attending the Generation BootCamp. (Making in the mood of the developer 💣)',
    )
    .setContact(
      'Vítor Oliveira. (@caulicons)',
      'https://github.com/caulicons',
      'caulicons.jobs@gmail.com',
    )
    .setVersion('0.00000001')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
