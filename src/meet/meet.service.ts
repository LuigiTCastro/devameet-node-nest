import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { MeetDocument, MeetModel } from "./schema/meet.schema";
import { Model } from "mongoose";
import { UserService } from "src/user/user.service";
import { CreateMeetDto } from "./dtos/createmeet.dto";
import { GetMeetDto } from "./dtos/getmeet.dto";

@Injectable()
export class MeetService {
    private logger = new Logger(MeetService.name);

    constructor(@InjectModel(MeetModel.name) 
        private readonly meetModel: Model<MeetDocument>, 
        private readonly userService: UserService
    ) { }

    async createMeet(dto: CreateMeetDto) {
        this.logger.debug('createMeet - Start')
        const createdMeet = new this.meetModel(dto); // creates an object of the MeetModel class (passing the dto attributes)
        await createdMeet.save();

        // TO FINISH
    }

    // async getMeetsByUser(userId: String) {
    async getMeetsByUser(userId: string) {
        this.logger.debug('getMeetsByUser - ' + userId)
        return await this.meetModel.find({ user: userId});
        // return await this.meetModel.find({ user: userId }) as GetMeetDto[];
    }

    async deleteMeet(userId: string, meetId: string) {
        this.logger.debug('deleteMeet - Start')
        return await this.meetModel.deleteOne({user: userId, _id: meetId})
    }
}