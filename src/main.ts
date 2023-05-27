import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger : ['debug', 'error',  'log', 'warn'] // Adds the log levels to be used in the application.
  });

  app.enableCors(); // Enable the use of Cors.

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false
    })
  );

  app.setGlobalPrefix('api'); // all path will have the 'api' prefix.

  await app.listen(3000);
}
bootstrap();


// Two new dependencies to install: clas-validator, class-transformer.
// Adicionar os níveis de log que queremos na nossa aplicação;
// Habilitar o cors;
// Adicionar nossa configuração nos pipes de validação;
// Criar nossa rota /api para todas as requisições.