import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserModel } from "./schema/user.schema";
import { Model } from "mongoose";
import { RegisterDto } from "./dtos/register.dto";
import { Injectable } from "@nestjs/common";
import * as CryptoJs from 'crypto-js'

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel.name) private readonly userModel : Model<UserDocument>){}

    async create(dto: RegisterDto){
        dto.password = CryptoJs.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY)

        const createdUser = new this.userModel(dto)
        await createdUser.save()
    }

    async existsByEmail(email : String) : Promise<boolean>{
        const result = await this.userModel.findOne(email);

        if(result) {
            return true;
        }

        return false;
    }
}