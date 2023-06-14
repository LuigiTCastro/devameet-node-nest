import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { MeetModel } from "src/meet/schema/meet.schema";
import { UserModel } from "src/user/schema/user.schema";

export type RoomObjectsDocument = HydratedDocument<RoomObjectsModel>

@Schema()
export class RoomObjectsModel {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MeetModel.name })
    meet: MeetModel;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserModel.name })
    user: UserModel;
    
    @Prop({ required: true })
    name: string;
    
    @Prop({ required: true })
    avatar: string;
    
    @Prop({ required: true })
    clientId: string;
    
    @Prop({ required: true })
    x: number;
    
    @Prop({ required: true })
    y: number;
    
    @Prop({ required: true })
    orientation: string;

    @Prop({ default: false })
    muted: boolean;
}

export const RoomObjectsSchema = SchemaFactory.createForClass(RoomObjectsModel);