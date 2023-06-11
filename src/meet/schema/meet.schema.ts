import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { UserModel } from "src/user/schema/user.schema";

export type MeetDocument = HydratedDocument<MeetModel>;

@Schema()
export class MeetModel {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }) // 'ObjectId' is the mongoose type used to wait for ids.
    user: UserModel;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    collor: string;

    @Prop({ required: true })
    link: string;

}

export const MeetSchema = SchemaFactory.createForClass(MeetModel);