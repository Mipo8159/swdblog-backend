import {Controller, Get, Put, Delete, Body, Param} from '@nestjs/common'
import {UpdateUserDto} from './dto/update_user.dto'
import {User} from './models/user.model'
import {UserService} from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // FIND USERS
  @Get()
  find(): Promise<User[]> {
    return this.userService.findAllUsers()
  }

  // FIND ONE BY ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(parseInt(id))
  }

  // UPDATE USER
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('user') dto: UpdateUserDto,
  ): Promise<[affectedCount: number]> {
    return this.userService.updateUser(parseInt(id), dto)
  }

  // REMOVE USER
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(parseInt(id))
  }
}
