import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MeetDocument, MeetModel } from "./schema/meet.schema";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { CreateMeetDto } from "./dtos/createmeet.dto";
import { GetMeetDto } from "./dtos/getmeet.dto";
import { generateLink } from "./helpers/linkgenerator.helpers";

@Injectable()
export class MeetService {
    private logger = new Logger(MeetService.name);

    constructor(@InjectModel(MeetModel.name) 
        private readonly meetModel: Model<MeetDocument>, 
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

        // TO FINISH
    }

    // async getMeetsByUser(userId: String) {
    async getMeetsByUser(userId: string) {
        this.logger.debug(`getMeetsByUser - ${userId}`)
        return await this.meetModel.find({ user: userId});
        // return await this.meetModel.find({ user: userId }) as GetMeetDto[];
    }
    
    async deleteMeet(userId: string, meetId: string) {
        this.logger.debug(`deleteMeet - ${userId} - ${meetId}`)
        return await this.meetModel.deleteOne({user: userId, _id: meetId})
    }
}