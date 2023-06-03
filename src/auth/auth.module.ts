import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [UserModule], // O que é necessario para o modulo funcionar
    controllers: [AuthController], // Rotas/Controller do modulo
    providers: [AuthService] // Objetos a serem injetados para o modulo funcionar
})

export class AuthModule {

}