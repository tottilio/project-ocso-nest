import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "http://127.0.0.1:3000",
      credentials: true
    }
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Ocso API')
    .setDescription('API for ocso management')
    .setVersion('0.9')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    }
  ))
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
