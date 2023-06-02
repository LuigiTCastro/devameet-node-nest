import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { MessagesHelper } from "./helpers/messages.helper";

@Injectable() // Mark a class as a service provider.
// Indicates that the class can be injected as a dependency in another class (within module context).
export class AuthService {
    
    login(dto: LoginDto) {
        
        if (dto.login !== 'admin@email.com' || dto.password !== 'admin123') {
            throw new BadRequestException(MessagesHelper.AUTH_LOGIN_OR_PASSWORD_NOT_FOUND)
        }
        
        return dto;
    }
}




/*
Com o decorator @Injectable (nativo do NestJS), este passa a ser capaz de 
criar instâncias dessa classe e fornecê-las automaticamente quando necessário, 
em vez de você ter que criar manualmente uma instância toda vez que ela for necessária.

(Automatic Management of Dependencies provided by the framework)

*/