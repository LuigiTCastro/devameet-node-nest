import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "src/user/dtos/register.dto";
import { IsPublic } from "./decorators/ispublic.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    login(@Body() dto: LoginDto) { // Whit the use of @Body, the value of DTO parameter will be extracted from http request body.
    // The object structure to be extracted is defined by LoginDto class.

    // O método login está decorado com @Post('login'), o que significa que esse método será invocado quando uma requisição POST for feita para a rota '/login'.
        
        return this.authService.login(dto);
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    register(@Body() dto: RegisterDto) {        
        return this.authService.register(dto);
    }
}



/*
[@BODY]
Is used to extract the datas from http request body 
and to provide this datas as parameter for a controller method.
*/


/*
[CONSTRUCTOR]:
Método especial de uma classe que é executado automaticamente quando se cria uma nova instância dessa classe. 
Tem o objetivo de inicializar os membros da classe e executar qualquer lógica de configuração necessária antes 
que a instância seja utilizada.
*/