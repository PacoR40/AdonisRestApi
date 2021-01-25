'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventoSchema extends Schema {
  up () {
    this.create('eventos', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('nombre', 40).notNullable()
      table.string('descripcion', 255).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('eventos')
  }
}

module.exports = EventoSchema
