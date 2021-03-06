import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/_filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform : true, stopAtFirstError : true}));
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
