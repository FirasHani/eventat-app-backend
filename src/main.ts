import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cors from 'cors';

async function bootstrap() {
  const expressApp = express();

  // Add CORS middleware
  expressApp.use(
    cors({
      origin: ['http://localhost:8081', 'https://your-vercel-app.vercel.app'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    })
  );

  // Use the ExpressAdapter for NestJS
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

  // Initialize the NestJS application
  await app.init();

  // Listen for incoming requests
  expressApp.listen(process.env.PORT || 3000, () => {
    console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
  });
}

// Export Vercel handler
export default bootstrap;
