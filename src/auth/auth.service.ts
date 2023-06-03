import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { MessagesHelper } from "./helpers/messages.helper";
import { RegisterDto } from "src/user/dtos/register.dto";
import { UserService } from "src/user/user.service";
import { UserMessageHelpers } from "src/user/helpers/message.helpers";

@Injectable() // Mark a class as a service provider.
// Indicates that the class can be injected as a dependency in another class (within module context).
export class AuthService {
    constructor(private readonly userService: UserService) {}

    private logger = new Logger(AuthService.name)

    login(dto: LoginDto) {
        this.logger.debug('login: started.');

        if (dto.login !== 'admin@email.com' || dto.password !== 'admin123') {
            throw new BadRequestException(MessagesHelper.AUTH_LOGIN_OR_PASSWORD_NOT_FOUND)
        }

        return dto;
    }

    async register(dto: RegisterDto){
        this.logger.debug('register: started.');

        if(await this.userService.existsByEmail(dto.email)) {
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