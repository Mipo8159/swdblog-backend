import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {Token} from '@app/modules/token/models/token.model'
import {ModelCtor} from 'sequelize-typescript'

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(Token) private readonly repo: ModelCtor<Token>,
  ) {}

  async save(model: Token): Promise<Token> {
    return model.save()
  }

  async findOne(refresh_token: string): Promise<Token> {
    return this.repo.findOne({where: {refresh_token}})
  }

  async delete(refresh_token: string): Promise<number> {
    return this.repo.destroy({
      where: {
        refresh_token,
      },
    })
  }
}
