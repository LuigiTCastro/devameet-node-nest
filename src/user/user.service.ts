import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserModel } from "./schema/user.schema";
import { Model } from "mongoose";
import { RegisterDto } from "./dtos/register.dto";
import { Injectable } from "@nestjs/common";
import * as CryptoJS from 'crypto-js' // DOUBT
import { UpdateUserDto } from "./dtos/updateuser.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>) { } // name from 'UserModel.name' is the name of the function.

    async create(dto: RegisterDto) {
        dto.password = CryptoJS.AES.encrypt(dto.password, process.env.USER_CYPHER_SECRET_KEY).toString();
        // Criptografa a senha atual do usuário usando a chave definida para salvá-la no banco.

        const createdUser = new this.userModel(dto);
        await createdUser.save()
    }

    async existsByEmail(email: String): Promise<boolean> {
        const result = await this.userModel.findOne({ email });

        if (result) {
            return true;
        }

        return false;
    }

    async getUserByLoginPassword(email: string, password: string): Promise<UserDocument | null> {
        const user = await this.userModel.findOne({ email }) as UserDocument;

        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.USER_CYPHER_SECRET_KEY);
            const savedPassword = bytes.toString(CryptoJS.enc.Utf8);

            if (password == savedPassword) {
                return user;
            }
        }

        return null;
    }

    async getUserById(id: string) {
        return await this.userModel.findById(id);
    }

    async updateUser(id: string, dto: UpdateUserDto) {
        return await this.userModel.findByIdAndUpdate(id, dto);
    }
}


/* 
CryptoJS.AES.encrypt()
    It is used to apply AES (Advanced Encryption Standard) encryption to the password.
    It receives as parameters: the password to be encrypted and the cryptographic key (defined as process.env.USER_CYPHER_SECRET_KEY)
*/