import {IsEmail, IsString} from 'class-validator'

export class RegisterDto {
  @IsEmail({}, {message: 'Provide an email'})
  email: string

  @IsString({message: 'Provide a username'})
  username: string

  @IsString({message: 'Provide a password'})
  password: string

  @IsString({message: 'Provide a profile image'})
  image_url: string
}
