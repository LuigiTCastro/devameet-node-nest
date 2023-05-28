import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { MessagesHelper } from "./helpers/messages.helper";

@Injectable()
export class AuthService {
    
    login(dto: LoginDto) {
    
        if (dto.login !== 'admin@email.com' || dto.password !== 'admin123') {
            throw new BadRequestException(MessagesHelper.AUTH_LOGIN_OR_PASSWORD_NOT_FOUND)
        }
        
        return dto;
    }
}