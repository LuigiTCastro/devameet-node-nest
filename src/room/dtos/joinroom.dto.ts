import { IsNotEmpty } from "class-validator";
import { RoomMessagesHelpers } from "../helpers/roommessages.helpers";

export class JoinRoomDto {

    @IsNotEmpty({ message: RoomMessagesHelpers.JOIN_USER_NOT_VALID })
    userId: string;

    @IsNotEmpty({ message: RoomMessagesHelpers.JOIN_LINK_NOT_VALID })
    link: string;
}