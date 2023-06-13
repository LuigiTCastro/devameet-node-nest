import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RoomObjectsDocument, RoomObjectsModel } from './schema/roomobjects.schema';
import { InjectModel } from '@nestjs/mongoose';
import { MeetObjectsDocument, MeetObjectsModel } from 'src/meet/schema/meetobjects.schema';
import { MeetDocument, MeetModel } from 'src/meet/schema/meet.schema';
import { Model } from 'mongoose';
import { RoomMessagesHelpers } from './helpers/roommessages.helpers';

@Injectable()
export class RoomService {
    // criar logger
    private logger = new Logger(RoomService.name);

    // constructor (models)
    constructor(
        @InjectModel(RoomObjectsModel.name) private readonly roomObjectsModel: Model<RoomObjectsDocument>,
        @InjectModel(MeetObjectsModel.name) private readonly meetObjectsModel: Model<MeetObjectsDocument>,
        @InjectModel(MeetModel.name) private readonly meetModel: Model<MeetDocument>
    ) { }

    // serviços (getRoom, getMeet, updateRoom, deleteRoom)
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
}
