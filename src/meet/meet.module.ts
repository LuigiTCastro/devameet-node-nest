import { Module } from "@nestjs/common";
import { MeetController } from "./meet.controller";
import { MeetService } from "./meet.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { MeetModel, MeetSchema } from "./schema/meet.schema";
import { MeetObjectsModel, MeetObjectsSchema } from "./schema/meetobjects.schema";

@Module({
    imports: [UserModule, MongooseModule.forFeature([
        { name: MeetModel.name, schema: MeetSchema }, // This represents a TABLE or an ARRAY./
        { name: MeetObjectsModel.name, schema: MeetObjectsSchema }
    ])],
    controllers: [MeetController],
    providers: [MeetService],
    exports: [MongooseModule, MeetService]
})

export class MeetModule {

}