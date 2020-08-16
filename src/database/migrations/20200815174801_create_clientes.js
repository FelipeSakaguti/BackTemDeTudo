
exports.up = function(knex) {
  return knex.schema.createTable('clientes', function(table){
        table.increments('id').primary();
        table.string('nome');
        table.string('endereco');
        table.string('telefone');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('clientes');
};
