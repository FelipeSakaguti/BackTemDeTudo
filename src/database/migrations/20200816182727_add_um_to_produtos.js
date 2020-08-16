
exports.up = function(knex) {
    return knex.schema.table('produtos', function(table) {
      table.string('unidade_medida');
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.table('produtos', function(table) {
      table.dropColumn('unidade_medida')
    })
  }
  