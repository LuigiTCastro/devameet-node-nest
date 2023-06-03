import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { UserMessageHelpers } from "../helpers/message.helpers";

// User Domain Layer
export class RegisterDto {
    
    @MinLength(2, {message: UserMessageHelpers.REGISTER_NAME_NOT_VALID})
    name: string;

    @IsEmail({}, {message: UserMessageHelpers.REGISTER_EMAIL_NOT_VALID})
    email: string;

    @MinLength(4, {message: UserMessageHelpers.REGISTER_PASSWORD_NOT_VALID})
    @MaxLength(20, {message: UserMessageHelpers.REGISTER_PASSWORD_NOT_VALID})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: UserMessageHelpers.REGISTER_PASSWORD_NOT_VALID})
    password: string;

    @IsString()
    avatar: string;
}