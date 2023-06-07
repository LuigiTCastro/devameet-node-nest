import { IsString, MinLength } from "class-validator";
import { UserMessageHelpers } from "../helpers/message.helpers";

export class UpdateUserDto {
    
    @MinLength(2, {message: UserMessageHelpers.REGISTER_NAME_NOT_VALID})
    name : string;
    
    @IsString()
    avatar : string
}