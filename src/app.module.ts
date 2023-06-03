import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guards';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL), 
    AuthModule,
    UserModule
  ],
  controllers: [], // Controladores são responsáveis por tratar as requisições HTTP e retornar as respostas adequadas.
  providers: [
    {provide: APP_GUARD, useClass: JwtAuthGuard}
  ], // Provedores são classes ou objetos responsáveis por fornecer funcionalidades para outros componentes do aplicativo, como serviços, repositórios, etc.
})

export class AppModule { }



/*
.FORROOT():
  Permite passar opções de configuração para o módulo, como: 
    credenciais de banco de dados, 
    URLs de serviços externos, 
    chaves de API, 
    configuração de middlewares para manipular solicitações HTTP etc.
    configurar a injeção de dependência no módulo, definindo quais provedores de serviço devem ser registrados no contêiner de injeção de dependência
*/