import {UserModel} from '@app/modules/user/model/user.model'
import {ApiProperty} from '@nestjs/swagger'
import {
  BelongsTo,
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript'

interface TokenCreationAttributes {
  refresh_token: string
  user_id: number
}

@Table({tableName: 'tokens', createdAt: false, updatedAt: false})
export class TokenModel extends Model<
  TokenModel,
  TokenCreationAttributes
> {
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
  @ForeignKey(() => UserModel)
  @Column({type: DataType.INTEGER})
  user_id: number

  @BelongsTo(() => UserModel)
  user: UserModel
}
