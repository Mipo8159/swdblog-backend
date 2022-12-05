import {Module} from '@nestjs/common'
import {SequelizeModule} from '@nestjs/sequelize'

import {UserController} from '@app/modules/user/user.controller'
import {UserService} from '@app/modules/user/user.service'
import {Token} from '@app/modules/token/models/token.model'
import {UserRepository} from '@app/modules/user/repositories/user.repository'
import {User} from '@app/modules/user/models/user.model'

@Module({
  imports: [SequelizeModule.forFeature([User, Token])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
