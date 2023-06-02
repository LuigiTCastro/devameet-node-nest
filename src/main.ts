import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger : ['debug', 'error',  'log', 'warn'] // Adds the log levels to be used in the application.
  });

  app.enableCors(); // Enable the use of Cors.

  app.useGlobalPipes( // Configura um middleware de validação global para o aplicativo.
    new ValidationPipe({ // Usa o ValidationPipe para aplicar validações nos dados recebidos nas requisições HTTP em toda a aplicação.
      transform: true, // Realiza a transformação dos dados recebidos para seus correspondentes tipos, com base nos decorators fornecidos. 
      whitelist: true, // Garante que apenas as propriedades com decoratos de validação sejam permitidas nos objetos de entrada.
      forbidNonWhitelisted: false // Com o whitelist ativo, esse parâmetro controla se uma requisição deve ser proibida (responder com erro HTTP) caso haja propriedades não decoradas. Se definido como false, as propriedades não decoradas são simplesmente removidas, mas a requisição é processada normalmente
    })
  );

  app.setGlobalPrefix('api'); // all path will have the 'api' prefix.

  await app.listen(3000);
}

bootstrap(); // Creates the NEST project from the AppModule..
// And goes up on the 3000 door.


// Two new dependencies to install: clas-validator, class-transformer.
// Adicionar os níveis de log que queremos na nossa aplicação;
// Habilitar o cors;
// Adicionar nossa configuração nos pipes de validação;
// Criar nossa rota /api para todas as requisições.