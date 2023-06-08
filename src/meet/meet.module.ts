import { Module } from "@nestjs/common";
import { MeetController } from "./meet.controller";
import { MeetService } from "./meet.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { MeetModel, MeetSchema } from "./schema/meet.schema";

@Module({
    imports: [UserModule, MongooseModule.forFeature([{ name: MeetModel.name, schema: MeetSchema }])],
    controllers: [MeetController],
    providers: [MeetService],
    exports: [MongooseModule, MeetService]
})

export class MeetModule {

}