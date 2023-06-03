import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.USER_JWT_SECRET_KEY
        })
    ], // O que é necessario para o modulo funcionar
    controllers: [AuthController], // Rotas/Controller do modulo
    providers: [AuthService, JwtStrategy] // Objetos a serem injetados para o modulo funcionar
})

export class AuthModule {

}