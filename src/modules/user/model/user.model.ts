import {TokenModel} from '@app/modules/token/model/token.model'
import {Column, DataType, HasOne, Table, Model} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'

interface UserCreationArributes {
  username: string
}
@Table({tableName: 'users'})
export class UserModel extends Model<UserModel, UserCreationArributes> {
  @ApiProperty({example: 1, description: 'Unique identificator'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({example: 'abc@gmail.com', description: "User's email"})
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  email: string

  @ApiProperty({example: 'Mipo', description: "User's nickname"})
  @Column({type: DataType.STRING, allowNull: false})
  username: string

  @ApiProperty({example: '12345678', description: "User's password"})
  @Column({type: DataType.STRING, allowNull: false})
  password: string

  @ApiProperty({
    example: 'abcd.s3.amazon.com',
    description: "User's profile image",
  })
  @Column({type: DataType.STRING, unique: true})
  image_url: string

  @HasOne(() => TokenModel)
  token: TokenModel
}
