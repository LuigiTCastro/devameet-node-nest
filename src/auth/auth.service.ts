import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { MessagesHelper } from "./helpers/messages.helper";
import { RegisterDto } from "src/user/dtos/register.dto";
import { UserService } from "src/user/user.service";
import { UserMessageHelpers } from "src/user/helpers/message.helpers";
import { JwtService } from "@nestjs/jwt";

@Injectable() // Mark a class as a service provider.
// Indicates that the class can be injected as a dependency in another class (within module context).
export class AuthService {
    
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    private logger = new Logger(AuthService.name);

    async login(dto: LoginDto) {
        this.logger.debug('login: started.');

        const user = await this.userService.getUserByLoginPassword(dto.login, dto.password)

        if (user == null) {
            throw new BadRequestException(MessagesHelper.AUTH_LOGIN_OR_PASSWORD_NOT_FOUND)
        }

        const tokenPayload = { email: user.email, sub: user._id }

        return {
            name: user.name,
            email: user.email,
            token: this.jwtService.sign(tokenPayload, {secret: process.env.USER_JWT_SECRET_KEY})
        };
    }


    // criar o user
    // verificar o valor do user
    // se nao nulo, criar o token
    // se nao nulo, retornar os dados do user

    async register(dto: RegisterDto) {
        this.logger.debug('register: started.');

        if (await this.userService.existsByEmail(dto.email)) {
            throw new BadRequestException(UserMessageHelpers.REGISTER_EXIST_EMAIL_ACCOUNT);
        }

        await this.userService.create(dto);
    }
}




/*
Com o decorator @Injectable (nativo do NestJS), este passa a ser capaz de 
criar instâncias dessa classe e fornecê-las automaticamente quando necessário, 
em vez de você ter que criar manualmente uma instância toda vez que ela for necessária.

(Automatic Management of Dependencies provided by the framework)

*/