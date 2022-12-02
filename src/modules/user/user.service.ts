import {Injectable} from '@nestjs/common'
import {UpdateUserDto} from '@app/modules/user/dto/update_user.dto'
import {UserRepository} from '@app/modules/user/repositories/user.repository'
import {User} from '@app/modules/user/models/user.model'
import {CreateUserDto} from './dto/create_user.dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // SAVE
  async saveUser(dto: CreateUserDto): Promise<User> {
    const user = new User()
    Object.assign(user, dto)
    return this.userRepository.save(user)
  }

  // FIND ALL
  findAllUsers(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  // FIND BY ID
  findUserById(id: number): Promise<User> {
    return this.userRepository.findById(id)
  }

  // FIND BY EMAIL
  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email)
  }

  // FIND BY USERNAME
  findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findByUsername(username)
  }

  // UPDATE USER
  async updateUser(
    id: number,
    dto: UpdateUserDto,
  ): Promise<[affectedCount: number]> {
    return this.userRepository.updateById(id, dto)
  }

  // REMOVE USER
  async deleteUser(id: number): Promise<number> {
    return this.userRepository.deleteById(id)
  }
}
