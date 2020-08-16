const db = require('../database/connection')

module.exports = {
    async create(request, response) {
        const registroVenda = request.body;

        const insertedVendaId = await db('vendas').insert({
            id_cliente: registroVenda.id_cliente || 0,
            id_produto: registroVenda.id_produto || 0,
            id_vendedor: registroVenda.id_vendedor || 0,
            qtd: registroVenda.qtd || 0,
            custo_unit: registroVenda.custo_unit || 0,
            valor_venda: registroVenda.valor_venda || 0,
        });

        return response.json({ id: insertedVendaId[0]});
    },

    async index(request, response) {
        const { id } = request.params;

        const venda = await db('vendas')
            .where('vendas.id', id )
            .leftJoin('clientes', 'vendas.id_cliente', '=', 'clientes.id')
            .leftJoin('produtos', 'vendas.id_produto', '=', 'produtos.id')
            .leftJoin('vendedores', 'vendas.id_vendedor', '=', 'vendedores.id')
            .select(['vendas.*', 'clientes.nome as nome_cliente', 'produtos.nome as nome_produto', 'vendedores.nome as nome_vendedor']);

        if(!id || !venda[0]){
            return response.status(400).json({ error: 'ID inexistente'})
        }

        return response.json( venda );
    },

    async delete(request, response) {
        const { id } = request.params;

        const venda = await db('vendas')
            .where('id', id )
            .delete();
        
        if(!venda) return response.status(400).json({ error: 'ID inexistente'});

        return response.status(204).send();
    },

    async update(request, response) {
        const { id } = request.params;
        const updateList = request.body;

        const venda = await db('vendas')
            .where('id', id )
            .select('*');

        if(!id || !venda[0]){
            return response.status(400).json({ error: 'ID inexistente'})
        }

        await db('vendas')
            .where('id', id )
            .update({
                id_cliente: updateList.id_cliente || venda[0].id_cliente,
                id_produto: updateList.id_produto || venda[0].id_produto,
                id_vendedor: updateList.id_vendedor || venda[0].id_vendedor,
                qtd: updateList.qtd || venda[0].qtd,
                custo_unit: updateList.custo_unit || venda[0].custo_unit,
                valor_venda: updateList.valor_venda || venda[0].valor_venda,
            });

        return response.json({id});
    },
}