import {JwtModule} from '@nestjs/jwt'
import {Module} from '@nestjs/common'
import {SequelizeModule} from '@nestjs/sequelize'
import {TokenService} from './token.service'
import {User} from '@app/modules/user/models/user.model'
import {Token} from '@app/modules/token/models/token.model'
import {TokenRepository} from './repositories/token.repository'

@Module({
  imports: [SequelizeModule.forFeature([User, Token]), JwtModule],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
