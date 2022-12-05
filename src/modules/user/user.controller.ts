import {Serialize} from '@app/shared/interceptors/serialize.interceptor'
import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common'
import {AuthGuard} from '@nestjs/passport'
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiHeader,
  ApiBody,
} from '@nestjs/swagger'

import {UpdateUserDto} from '@app/modules/user/dto/update_user.dto'
import {UserExposeDto} from '@app/modules/user/dto/user_expose.dto'
import {User} from '@app/modules/user/models/user.model'
import {UserService} from '@app/modules/user/user.service'
import {UserDecorator} from '@app/modules/user/decorators/user.decorator'
import {
  updateUserRequest,
  userResponse,
} from '@app/helper/swagger/user.swagger'
import {authHeader} from '@app/helper/swagger/auth.swagger'
import {
  swagBadRequest,
  swagUnauthorized,
} from '@app/helper/util/swagger.exception'

@ApiTags('Users')
@Controller('users')
@Serialize(UserExposeDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // FIND USER PROFILE
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access_token')
  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: {example: authHeader},
  })
  @ApiOperation({summary: 'FETCH PROFILE'})
  @ApiResponse({status: 200, schema: {example: userResponse}})
  @ApiResponse({
    status: 401,
    schema: {example: swagUnauthorized('Unauthorized')},
  })
  findProfile(@UserDecorator('id') id: string): Promise<User> {
    return this.userService.findUserById(parseInt(id))
  }

  // FIND ONE BY ID
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: {example: authHeader},
  })
  @ApiOperation({summary: 'FIND USER'})
  @ApiParam({name: 'id', required: true, type: Number, example: 1})
  @ApiResponse({status: 200, schema: {example: userResponse}})
  @ApiResponse({
    status: 401,
    schema: {example: swagUnauthorized('Unauthorized')},
  })
  @ApiResponse({
    status: 400,
    schema: {example: swagBadRequest('User not found')},
  })
  findOneById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(parseInt(id))
  }

  // UPDATE USER
  @Put()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: {example: authHeader},
  })
  @ApiOperation({summary: 'UPDATE CURRENT USER'})
  @ApiBody({schema: {example: updateUserRequest}})
  @ApiResponse({status: 200, schema: {example: userResponse}})
  @ApiResponse({
    status: 401,
    schema: {example: swagUnauthorized('Unauthorized')},
  })
  update(
    @UserDecorator('id') id: string,
    @Body('user') dto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(parseInt(id), dto)
  }

  // TOGGLE USER ACTIVE STATUS
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    required: true,
    schema: {example: authHeader},
  })
  @ApiOperation({summary: 'TOGGLE CURRENT USER STATUS'})
  @ApiResponse({status: 200, schema: {example: userResponse}})
  @ApiResponse({
    status: 401,
    schema: {example: swagUnauthorized('Unauthorized')},
  })
  async toggleStatus(@UserDecorator('id') id: string): Promise<User> {
    return this.userService.toggleStatus(parseInt(id))
  }
}
