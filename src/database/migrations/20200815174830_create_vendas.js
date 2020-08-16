
exports.up = function(knex) {
  return knex.schema.createTable('vendas', function(table){
        table.increments('id').primary();
        table.integer('id_cliente');
        table.integer('id_produto');
        table.integer('id_vendedor');
        table.decimal('qtd');
        table.decimal('custo_unit');
        table.decimal('valor_venda');
        table.timestamp('vendido_em').defaultTo('CURRENT_TIMESTAMP');

        table.foreign('id_cliente').references('id').inTable('clientes');
        table.foreign('id_produto').references('id').inTable('produtos');
        table.foreign('id_vendedor').references('id').inTable('vendedores');

    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('vendas');
};
