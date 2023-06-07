import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Put, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserMessageHelpers } from "./helpers/message.helpers";
import { UpdateUserDto } from "./dtos/updateuser.dto";
import { IsPublic } from "src/auth/decorators/ispublic.decorator";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUser (@Request() req) {
        const { userId } = req?.user;
        const user = await this.userService.getUserById(userId);

        if(!user) {
            throw new BadRequestException(UserMessageHelpers.GET_USER_NOT_FOUND);
        }

        return {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            id: user._id
        }
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async updateUser(@Request() req, @Body() dto: UpdateUserDto) {
        const { userId } = req?.user; // where does the user come from?
        await this.userService.updateUser(userId, dto);
    }

}


