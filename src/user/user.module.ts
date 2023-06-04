import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModel, UserSchema } from "./schema/user.schema";
import { UserController } from "./user.controller";

@Module({
    imports: [MongooseModule.forFeature([{name: UserModel.name, schema: UserSchema}])],
    controllers: [UserController],
    providers: [UserService],
    exports: [MongooseModule, UserService]
})

export class UserModule {

}