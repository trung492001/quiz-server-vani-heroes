import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(passport.initialize());
  app.useGlobalPipes(new ValidationPipe());
  const PORT = 3333;
  await app.listen(PORT, () => {
    console.log(`App start with ${PORT}`);
  });
}
bootstrap();
