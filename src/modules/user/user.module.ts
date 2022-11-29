import {Module} from '@nestjs/common'
import {UserController} from '@app/modules/user/user.controller'
import {UserService} from '@app/modules/user/user.service'
import {SequelizeModule} from '@nestjs/sequelize'
import {UserModel} from './model/user.model'
import {TokenModel} from '../token/model/token.model'

@Module({
  imports: [SequelizeModule.forFeature([UserModel, TokenModel])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
