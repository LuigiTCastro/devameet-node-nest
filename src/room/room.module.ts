import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { UserModule } from 'src/user/user.module';
import { MeetModule } from 'src/meet/meet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomObjectsModel, RoomObjectsSchema } from './schema/roomobjects.schema';
import { RoomGateway } from './room.gateway';

@Module({
    imports: [UserModule, MeetModule, MongooseModule.forFeature([
        { name: RoomObjectsModel.name, schema: RoomObjectsSchema }
    ])],
    controllers: [RoomController],
    providers: [RoomService, RoomGateway],
    exports: [RoomService]
})
export class RoomModule { }
