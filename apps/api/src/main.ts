import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  // Enable CORS for Next.js application address
  app.enableCors({
    origin: process.env.NEXTJS_URL,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true
  })
  await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
