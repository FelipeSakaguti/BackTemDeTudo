
exports.up = function(knex) {
    return knex.schema.createTable('vendedores', function(table){
        table.increments('id').primary();
        table.string('nome');
        table.boolean('active');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('vendedores');
};
