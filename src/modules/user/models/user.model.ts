import {Column, DataType, HasOne, Table, Model} from 'sequelize-typescript'
import {ApiProperty} from '@nestjs/swagger'

import {Token} from '@app/modules/token/models/token.model'

export interface IUserAttrs {
  email: string
  username: string
  password: string
  image_url: string | undefined
}
@Table({
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class User extends Model<User, IUserAttrs> {
  @ApiProperty({example: 1, description: 'Unique identificator'})
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
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
    example: 'bucket.s3.amazonaws.com/mock-image.jpg',
    description: "User's profile image",
  })
  @Column({type: DataType.STRING, unique: false, allowNull: true})
  image_url: string

  @ApiProperty({example: true, description: "User's active status"})
  @Column({type: DataType.BOOLEAN, defaultValue: true})
  active: boolean

  @HasOne(() => Token)
  token: Token
}
