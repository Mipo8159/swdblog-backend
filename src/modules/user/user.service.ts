import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectModel} from '@nestjs/sequelize'
import {UserModel} from '@app/modules/user/model/user.model'
import {CreateUserDto} from './dto/create_user.dto'
import {sequelize} from '@app/config/sequalize.config'
import {UpdateUserDto} from './dto/update_user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userRepository: typeof UserModel,
  ) {}

  // CREATE USER
  create(dto: CreateUserDto): Promise<UserModel> {
    const user = this.userRepository.create(dto)
    return user
  }

  // FIND USERS
  async find(): Promise<UserModel[]> {
    const [users] = await sequelize.query('SELECT * FROM USERS')
    return users as UserModel[]
  }

  // FIND ONE BY ID
  async findOne(id: number): Promise<UserModel> {
    const [user] = await sequelize.query(
      'SELECT * FROM users WHERE id = :id',
      {
        replacements: {id},
      },
    )
    return user[0] as UserModel
  }

  // FIND ONE BY EMAIL
  async findByEmail(email: string): Promise<UserModel> {
    const [user] = await sequelize.query(
      'SELECT * FROM users WHERE email = :email',
      {
        replacements: {email},
      },
    )
    return user[0] as UserModel
  }

  // UPDATE USER
  async update(id: number, dto: UpdateUserDto): Promise<UserModel> {
    const exists = await this.findOne(id)
    if (!exists) throw new NotFoundException('User not found')

    const [user] = await sequelize.query(
      'UPDATE users SET username = :username, image_url = :image_url WHERE id = :id',
      {
        replacements: {
          username: dto.username || exists.username,
          image_url: dto.image_url || exists.image_url,
          id,
        },
      },
    )
    return user[0] as UserModel
  }

  // REMOVE USER
  async remove(id: number) {
    const user = await this.findOne(id)
    if (!user) throw new NotFoundException('User not found')

    const [_rm, removed] = await sequelize.query(
      'DELETE FROM users WHERE id = :id',
      {
        replacements: {id},
      },
    )
    return {_rm, removed}
  }
}
