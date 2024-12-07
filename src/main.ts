import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cors from 'cors';

let server: any;

// Main bootstrap function for local development
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

  // Start the server for local development
  const port = process.env.PORT || 3000;
  return expressApp.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

// Export the handler for Vercel
export default async function handler(req: any, res: any) {
  if (!server) {
    const expressApp = express();

    // Add CORS middleware
    expressApp.use(
      cors({
        origin: ['http://localhost:8081', 'https://eventat-app-backend.vercel.app'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      })
    );

    // Use the ExpressAdapter for NestJS
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await app.init();

    // Save the initialized Express server
    server = expressApp;
  }

  server(req, res);
}

// If running locally, bootstrap the server
if (require.main === module) {
  bootstrap();
}
