import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  const port = process.env.PORT;

  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:5173', 'http://192.168.1.33:5173'],
    credentials: true,
    exposedHeaders: 'set-cookie'
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Api для byRestaurants')
    .setVersion('1.0')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });

  await app.listen(port);
  const logger = new Logger('Bootstrap');
  logger.log(`Сервер запущен по адресу: http://localhost:${port}/swagger`);
}
bootstrap();
