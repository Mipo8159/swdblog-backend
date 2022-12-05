import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {ModelCtor} from 'sequelize-typescript'

import {Token} from '@app/modules/token/models/token.model'

@Injectable()
export class TokenRepository {
  constructor(
    @InjectModel(Token) private readonly repo: ModelCtor<Token>,
  ) {}

  async save(model: Token): Promise<Token> {
    return model.save()
  }

  async findOne(user_id: number): Promise<Token> {
    return this.repo.findOne({where: {user_id}})
  }

  async delete(refresh_token: string): Promise<number> {
    return this.repo.destroy({
      where: {
        refresh_token,
      },
    })
  }
}
