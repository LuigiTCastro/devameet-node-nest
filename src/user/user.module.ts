import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserSchema } from "./schema/user.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: UserModel.name, schema: UserSchema}])],
    controllers: [],
    providers: [UserService],
    exports: [MongooseModule, UserService]
})

export class UserModule {

}