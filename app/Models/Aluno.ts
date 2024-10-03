import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Turma from './Turma'

export default class Aluno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public matricula: string

  @column()
  public ativo: boolean

  @column()
  admId: number

  @column()
  turma_name: string

  @column()
  turmaId: number

  @belongsTo(() => Turma)
  public turma: BelongsTo<typeof Turma>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
