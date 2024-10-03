import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'alunos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('matricula').notNullable().unique()
      table.boolean('ativo').notNullable().defaultTo(true)
      table.bigInteger('adm_id').unsigned().references('id').inTable('adms').onDelete('SET NULL').onUpdate('CASCADE')
      table.string('turma_name').unsigned().references('name').inTable('turmas').onDelete('SET NULL').onUpdate('CASCADE')
      table.bigInteger('turma_id').unsigned().references('id').inTable('turmas').onDelete('SET NULL').onUpdate('CASCADE')





      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
