import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Turma from './Turma'
import Aluno from './Aluno'

export default class Adm extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public token: string | null

  @hasMany(() => Aluno)
  public alunos: HasMany<typeof Aluno>

  @hasMany(() => Turma)
  public turmas: HasMany<typeof Turma>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (adm: Adm) {
    if (adm.$dirty.password) {
      adm.password = await Hash.make(adm.password)
    }
  }
}
