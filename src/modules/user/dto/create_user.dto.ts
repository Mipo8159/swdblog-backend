import {IsString, IsEmail} from 'class-validator'

export class CreateUserDto {
  @IsEmail({}, {message: 'Provide an email'})
  email: string

  @IsString({message: 'Provide a username'})
  username: string

  @IsString({message: 'Provide a profile image'})
  image_url: string

  @IsString({message: 'Provide a password'})
  password: string
}
