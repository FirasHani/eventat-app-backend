import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Add CORS using Express middleware
  app.use(cors({
    origin: ['http://localhost:8081', 'https://eventat-app-backend.vercel.app'], // Include your Vercel URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  


  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();