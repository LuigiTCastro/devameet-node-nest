import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MeetDocument, MeetModel } from "./schema/meet.schema";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { CreateMeetDto } from "./dtos/createmeet.dto";
import { GetMeetDto } from "./dtos/getmeet.dto";
import { generateLink } from "./helpers/linkgenerator.helpers";
import { MeetObjectsDocument, MeetObjectsModel } from "./schema/meetobjects.schema";
import { UpdateMeetDto } from "./dtos/updatemeet.dto";
import { MeetMessagesHelpers } from "./helpers/messages.helpers";

@Injectable()
export class MeetService {
    private logger = new Logger(MeetService.name);

    constructor(
        @InjectModel(MeetModel.name)
        private readonly meetModel: Model<MeetDocument>,
        @InjectModel(MeetObjectsModel.name)
        private readonly meetObjects: Model<MeetObjectsDocument>,
        private readonly userService: UserService
    ) { }

    async createMeet(userId: string, dto: CreateMeetDto) {
        this.logger.debug(`createMeet - ${userId} - Start`)

        const user = await this.userService.getUserById(userId);
        const payload = {
            ...dto,
            user,
            link: generateLink()
        }

        const createdMeet = new this.meetModel(payload); // creates an object of the MeetModel class (passing the payload attributes)
        return createdMeet.save();
    }

    async getMeetsByUser(userId: string) {
        this.logger.debug(`getMeetsByUser - ${userId}`)
        return await this.meetModel.find({ user: userId });
        // return await this.meetModel.find({ user: userId }) as GetMeetDto[];
    }

    async getMeetObjectsById(userId: string, meetId: string) {
        this.logger.debug(`getMeetObjects - ${userId} - ${meetId}`);
        const user = await this.userService.getUserById(userId);
        const meet = await this.meetModel.findOne({ user, _id: meetId })
        return await this.meetObjects.find({ meet });
    }

    async deleteMeet(userId: string, meetId: string) {
        this.logger.debug(`deleteMeet - ${userId} - ${meetId}`)
        return await this.meetModel.deleteOne({ user: userId, _id: meetId })
    }

    async updateMeet(userId: string, meetId: string, dto: UpdateMeetDto) {
        this.logger.debug(`updateMeet - ${userId} - ${meetId}`)
        const user = await this.userService.getUserById(userId);
        const meet = await this.meetModel.findOne({ user, _id: meetId });

        if (!meet) {
            throw new BadRequestException(MeetMessagesHelpers.UPDATE_OBJECT_NAME_NOT_VALID);
        }

        this.logger.debug('updateMeet - set new values on meet');
        meet.name = dto.name;
        meet.collor = dto.collor;
        await this.meetModel.findByIdAndUpdate({ _id: meetId }, meet);

        this.logger.debug('updateMeet - delete previous objects');
        await this.meetObjects.deleteMany({ meet });

        this.logger.debug('updateMeet - insert new objects');
        let objectsPayload;
        // let objectsPayload: any;
        for (const object of dto.objects) {
            objectsPayload = {
                meet,
                ...object
            }
            await this.meetObjects.create(objectsPayload);
        }
    }
}


/*
('...')
This element is called of SPREAD OPERATOR. 

ex.: objectsPayload = {
                        meet,
                        ...object
                    }
In this case, is used to spread the object properties on the new object 'objectsPayload'
This allows to combine the properties of both objects into a single object.

{
    "p1Ob1": "",
    "p2Ob1": "",
    "p3Ob1": {
        "p1Ob2": "",
        "p2Ob2": ""
    }
}
*/