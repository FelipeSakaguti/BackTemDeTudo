 
exports.up = function(knex) {
    return knex.schema.createTable('produtos', function(table){
        table.increments('id').primary();
        table.string('nome');
        table.string('descricao');
        table.string('marca');
        table.string('fornecedor');
        table.string('classificacao');
        table.decimal('custo');
        table.decimal('venda');
        table.decimal('qtd_estoque');
        table.decimal('qtd_loja');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('produtos');
};
