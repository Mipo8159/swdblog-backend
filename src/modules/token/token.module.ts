import {Module} from '@nestjs/common'
import {SequelizeModule} from '@nestjs/sequelize'
import {TokenModel} from '@app/modules/token/model/token.model'
import {TokenService} from './token.service'
import {UserModel} from '../user/model/user.model'

@Module({
  imports: [SequelizeModule.forFeature([UserModel, TokenModel])],
  providers: [TokenService],
})
export class TokenModule {}
