import {Serialize} from '@app/shared/interceptors/serialize.interceptor'
import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'
import {UpdateUserDto} from './dto/update_user.dto'
import {UserExposeDto} from './dto/user_expose.dto'
import {User} from './models/user.model'
import {UserService} from './user.service'
import {UserDecorator} from '@app/modules/user/decorators/user.decorator'
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
@Serialize(UserExposeDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // FIND USER PROFILE
  @ApiOperation({summary: 'Retrieve current user profile'})
  @ApiResponse({status: 200, type: User, description: 'Retrieve profile'})
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  findProfile(@UserDecorator('id') id: string): Promise<User> {
    return this.userService.findUserById(parseInt(id))
  }

  // FIND ONE BY ID
  @ApiOperation({summary: 'Fetch user information by id'})
  @ApiParam({name: 'id', required: true, type: Number, example: 1})
  @ApiResponse({status: 200, type: User})
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOneById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(parseInt(id))
  }

  // UPDATE USER
  @Put(':id')
  @ApiParam({name: 'id', required: true, type: Number, example: 1})
  @ApiOperation({summary: 'Update user information by ID'})
  @ApiResponse({status: 200, type: User})
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found',
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body('user') dto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(parseInt(id), dto)
  }

  // REMOVE USER
  @ApiOperation({summary: 'Remove or Deactivate user by ID'})
  @ApiParam({name: 'id', required: true, type: Number, example: 1})
  @ApiResponse({status: 200, description: 'user with id 1 removed'})
  @ApiResponse({status: 404, description: 'User not found'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(parseInt(id))
  }
}
