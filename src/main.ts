import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Add this import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Library Management System')
    .setDescription('API for managing books, users, and borrows in a library.')
    .setVersion('1.0')
    .addTag('books') // Tags for grouping endpoints
    .addTag('users')
    .addTag('borrows')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Sets up Swagger UI at /api

  await app.listen(3000);
}
bootstrap();