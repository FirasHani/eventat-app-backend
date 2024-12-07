import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { VercelRequest, VercelResponse } from '@vercel/node';

async function createNestServer() {
  const app = await NestFactory.create(AppModule);

  // Add CORS using Express middleware
  app.use(cors({
    origin: 'http://localhost:8081', // Adjust this to your frontend URL if necessary
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

  return app;
}

// Start the NestJS application locally
async function bootstrap() {
  const app = await createNestServer();
  await app.listen(process.env.PORT || 3001);
  console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
}

// Export the handler for Vercel
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await createNestServer();
  await app.init(); // Initialize the app
  return app.getHttpAdapter().getInstance().handle(req, res); // Handle requests
}

// If not in Vercel, start the application
if (process.env.VERCEL === undefined) {
  bootstrap();
}
