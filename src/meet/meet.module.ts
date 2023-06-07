import { Module } from "@nestjs/common";
import { MeetController } from "./meet.controller";
import { MeetService } from "./meet.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [MongooseModule, UserModule, JwtModule],
    controllers: [MeetController],
    providers: [MeetService]
})


export class MeetModule {

}