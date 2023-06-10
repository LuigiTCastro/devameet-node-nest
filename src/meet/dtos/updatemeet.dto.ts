import { IsArray, IsNotEmpty, IsNumber, IsString, Matches, Max, Min, ValidateNested, isNotEmpty } from "class-validator";
import { CreateMeetDto } from "./createmeet.dto";
import { MeetMessagesHelpers } from "../helpers/messages.helpers";
import { Type } from "class-transformer";

export class UpdateMeetDto extends CreateMeetDto { // 'Extends' is a way of to INHERIT from a class in the NODEJS.

    @IsArray({ message: MeetMessagesHelpers.UPDATE_OBJECT_NAME_NOT_VALID })
    @Type(() => UpdateMeetObjectsDto) // It defines that each array element must be of type X.
    @ValidateNested({ each: true }) // It validates each array element individually, according to the rules defined in X.
    objects: Array<UpdateMeetObjectsDto>
}

export class UpdateMeetObjectsDto {

    @IsString({ message: MeetMessagesHelpers.UPDATE_OBJECT_NAME_NOT_VALID })
    name: string;

    @IsNumber({}, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Min(0, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Max(8, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    // @Matches(/^[0-8]$/, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    x: number;

    @IsNumber({}, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Min(0, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    @Max(8, { message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID })
    // @Matches(/^[0-8]$/, {message: MeetMessagesHelpers.UPDATE_XY_NOT_VALID})
    y: number;

    @IsNumber({}, { message: MeetMessagesHelpers.UPDATE_ZINDEX_NOT_VALID })
    zindex: number;

    @IsString({ message: MeetMessagesHelpers.UPDATE_ORIENTATION_NOT_VALID })
    orientation: string;
}