import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [], // O que é necessario para o modulo funcionar
    controllers: [AuthController], // Rotas/Controller do modulo
    providers: [AuthService] // Objetos a serem injetados pafa o modulo funcionar
})

export class AuthModule {

}