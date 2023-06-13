import { IsBoolean } from "class-validator";
import { JoinRoomDto } from "./joinroom.dto";
import { RoomMessagesHelpers } from "../helpers/roommessages.helpers";

export class ToglMuteDto extends JoinRoomDto {

    @IsBoolean({ message: RoomMessagesHelpers.TOGL_MUTE_NOT_VALID })
    mute: boolean;

}