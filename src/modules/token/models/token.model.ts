import {User} from '@app/modules/user/models/user.model'
import {ApiProperty} from '@nestjs/swagger'
import {
  BelongsTo,
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript'

export interface ITokenAttrs {
  refresh_token: string
  user_id: number
}

@Table({tableName: 'tokens', createdAt: false, updatedAt: false})
export class Token extends Model<Token, ITokenAttrs> {
  @ApiProperty({example: 1, description: 'Unique identificator'})
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number

  @ApiProperty({
    example: 'ey0sa9aw..',
    description: 'Unique token',
  })
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  refresh_token: string

  @ApiProperty({
    example: 2,
    description: 'Associated user id',
  })
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  user_id: number

  @BelongsTo(() => User)
  user: User
}
