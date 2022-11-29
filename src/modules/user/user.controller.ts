import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
} from '@nestjs/common'
import {CreateUserDto} from './dto/create_user.dto'
import {UpdateUserDto} from './dto/update_user.dto'
import {UserModel} from './model/user.model'
import {UserService} from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // CREATE USER
  @Post()
  create(@Body('user') dto: CreateUserDto) {
    return this.userService.create(dto)
  }

  // FIND USERS
  @Get()
  find(): Promise<UserModel[]> {
    return this.userService.find()
  }

  // FIND ONE BY EMAIL
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email)
  }

  // FIND ONE BY ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserModel> {
    return this.userService.findOne(parseInt(id))
  }

  // UPDATE USER
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('user') dto: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.update(parseInt(id), dto)
  }

  // REMOVE USER
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(parseInt(id))
  }
}
