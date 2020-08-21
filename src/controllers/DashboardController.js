const db = require('../database/connection')

module.exports = {
    async bestSeller(request, response) {

        const vendas = await db('vendas')
            .leftJoin('vendedores', 'vendas.id_vendedor', '=', 'vendedores.id')
            .groupBy('vendedores.id')
            .sum('valor_venda as venda')
            .whereNot('id_vendedor', 0)
            .orderBy('venda', 'desc')
            .select(['vendas.id_vendedor', 'vendedores.nome as nome_vendedor']);

        return response.json( vendas );
    },

    async bestCustomer(request, response) {

        const vendas = await db('vendas')
            .leftJoin('clientes', 'vendas.id_cliente', '=', 'clientes.id')
            .groupBy('clientes.id')
            .sum('valor_venda as venda')
            .whereNot('id_cliente', 0)
            .orderBy('venda', 'desc')
            .select(['vendas.id_cliente', 'clientes.nome as nome_cliente']);

        return response.json( vendas );
    }
}