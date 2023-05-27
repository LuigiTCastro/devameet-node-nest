import { IsEmail, IsNotEmpty } from "class-validator";
import { MessagesHelper } from "../helpers/messages.helper";

export class LoginDto {
    @IsEmail({}, {message: MessagesHelper.AUTH_LOGIN_NOT_FOUND}) // Decorator that checks if the field below is valid.
                    // {first parameter}: Validator
                    // {second parameter}: Validation if not be valid (in this case, it returns the message.helper)
    login: string;

    @IsNotEmpty({message: MessagesHelper.AUTH_PASSWORD_NOT_FOUND})
    password: string
}