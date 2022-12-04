import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {ModelCtor} from 'sequelize-typescript'
import {Op} from 'sequelize'
import {IRepo} from '@app/shared/interfaces/repository.interface'
import {User} from '@app/modules/user/models/user.model'

@Injectable()
export class UserRepository implements IRepo<User> {
  constructor(@InjectModel(User) private repo: ModelCtor<User>) {}

  async save(model: User): Promise<User> {
    return model.save()
  }

  async findAll(): Promise<User[]> {
    return this.repo.findAll()
  }

  async findById(id: number): Promise<User> {
    return this.repo.findByPk(id)
  }

  async findByEmail(email: string): Promise<User> {
    return this.repo.findOne({where: {email}})
  }

  async findByUsername(username: string): Promise<User> {
    return this.repo.findOne({where: {username}})
  }

  async findByIds(ids: number[]): Promise<User[]> {
    return this.repo.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })
  }

  async deleteById(id: number): Promise<number> {
    return this.repo.destroy({
      where: {
        id,
      },
    })
  }
}
