import {Injectable, NotFoundException} from '@nestjs/common'

import {UpdateUserDto} from '@app/modules/user/dto/update_user.dto'
import {UserRepository} from '@app/modules/user/repositories/user.repository'
import {User} from '@app/modules/user/models/user.model'
import {CreateUserDto} from '@app/modules/user/dto/create_user.dto'

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
  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  // FIND BY EMAIL
  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email)
  }

  // FIND BY USERNAME
  async findUserByUsername(username: string): Promise<User> {
    const user = this.userRepository.findByUsername(username)
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  // UPDATE USER
  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id)
    if (!user) throw new NotFoundException('User not found')
    Object.assign(user, dto)
    return this.userRepository.save(user)
  }

  // REMOVE USER
  async toggleStatus(id: number): Promise<User> {
    const user = await this.findUserById(id)
    if (!user) throw new NotFoundException('User not found')
    user.active = !user.active
    return this.userRepository.save(user)
  }
}
