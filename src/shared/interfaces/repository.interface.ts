import {Attributes} from 'sequelize'
import {Model} from 'sequelize-typescript'

export interface IRepo<M extends Model> {
  save(model: M): Promise<M>
  findById(id: number): Promise<M | null>
  findAll(): Promise<M[]>
  deleteById(id: number): Promise<number>
  findByIds(ids: number[]): Promise<M[]>
}
