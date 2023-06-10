import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { MeetModel } from "./meet.schema";

export type MeetObjectsDocument = HydratedDocument<MeetObjectsModel>;

@Schema()
export class MeetObjectsModel {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MeetModel.name })
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MeetModel' })
    meet: MeetModel;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    x: number;

    @Prop({ required: true })
    y: number;

    @Prop({ required: true })
    zindex: number;

    @Prop({ required: true })
    orientation: string;

}

export const MeetObjectsSchema = SchemaFactory.createForClass(MeetObjectsModel);