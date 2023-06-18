import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RoomObjectsDocument, RoomObjectsModel } from './schema/roomobjects.schema';
import { InjectModel } from '@nestjs/mongoose';
import { MeetObjectsDocument, MeetObjectsModel } from 'src/meet/schema/meetobjects.schema';
import { MeetDocument, MeetModel } from 'src/meet/schema/meet.schema';
import { Model } from 'mongoose';
import { RoomMessagesHelpers } from './helpers/roommessages.helpers';
import { UpdateUserPositionDto } from './dtos/updateposition.dto';
import { UserService } from 'src/user/user.service';
import { ToglMuteDto } from './dtos/toglMute.dto';

@Injectable()
export class RoomService {
    // criar logger
    private logger = new Logger(RoomService.name);

    // constructor (models)
    constructor(
        @InjectModel(RoomObjectsModel.name) private readonly roomObjectsModel: Model<RoomObjectsDocument>,
        @InjectModel(MeetObjectsModel.name) private readonly meetObjectsModel: Model<MeetObjectsDocument>,
        @InjectModel(MeetModel.name) private readonly meetModel: Model<MeetDocument>,
        private readonly userService: UserService
    ) { }

    // services (getRoom, getMeet, updateRoom, deleteRoom)
    async _getMeet(link: string) {
        this.logger.debug(`_getMeet - ${link}`);
        const meet = await this.meetModel.findOne({ link: link })

        if (!meet) {
            throw new BadRequestException(RoomMessagesHelpers.ROOM_LINK_NOT_FOUND);
        }

        return meet;
    }

    async getRoom(link: string) {
        this.logger.debug(`getRoom - ${link}`)
        const meet = await this._getMeet(link);
        const objects = await this.meetObjectsModel.find({ meet })

        return {
            link,
            name: meet.name,
            collor: meet.collor,
            objects
        }
    }

    async listUsersPositionByLink(link: string) {
        this.logger.debug(`listUsersPositionByLink - ${link}`);

        const meet = await this._getMeet(link);
        return await this.roomObjectsModel.find({ meet });
    }

    async deleteUserPosition(clientId: string) {
        this.logger.debug(`deleteUserPosition - ${clientId}`);

        return await this.roomObjectsModel.deleteMany({ clientId });
    }

    async updateUserPosition(clientId: string, dto: UpdateUserPositionDto) {
        this.logger.debug(`updateUserPosition - ${clientId}`);

        const user = await this.userService.getUserById(dto.userId);
        const meet = await this._getMeet(dto.link);

        const position = {
            ...dto,
            clientId,
            user,
            meet,
            name: user.name,
            avatar: user.avatar
        }

        const usersInRoom = await this.roomObjectsModel.find({ meet });

        const loggedUsersInRoom = usersInRoom.find(u => {
            return u.user.toString() === user._id.toString() || u.clientId === clientId
        });

        if (loggedUsersInRoom) {
            await this.roomObjectsModel.findByIdAndUpdate({ _id: loggedUsersInRoom._id }, position);
        }
        else {
            if (usersInRoom && usersInRoom.length > 10) {
                throw new BadRequestException(RoomMessagesHelpers.ROOM_MAX_USERS);
            }
            await this.roomObjectsModel.create(position)
        }
    }

    async updateUserMuted(dto: ToglMuteDto) {
        this.logger.debug(`updateUserMute - ${dto.link} - ${dto.userId}`);

        const user = await this.userService.getUserById(dto.userId);
        const meet = await this._getMeet(dto.link)

        await this.roomObjectsModel.updateMany({ user, meet }, { mute: dto.mute });
    }
}
