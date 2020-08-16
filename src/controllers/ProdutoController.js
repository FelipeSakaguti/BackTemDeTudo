const db = require('../database/connection')

module.exports = {
    async create(request, response) {
        const registroProduto = request.body;

        const insertedProdutoId = await db('produtos').insert({
            nome: registroProduto.nome || '',
            descricao: registroProduto.descricao || '',
            marca: registroProduto.marca || '',
            fornecedor: registroProduto.fornecedor || '',
            classificacao: registroProduto.classificacao || '',
            custo: registroProduto.custo || 0,
            venda: registroProduto.venda || 0,
            qtd_estoque: registroProduto.qtd_estoque || 0,
            qtd_loja: registroProduto.qtd_loja || 0,
            unidade_medida: registroProduto.unidade_medida || '',
        });

        return response.json({ id: insertedProdutoId[0]});
    },

    async index(request, response) {
        const { id } = request.params;

        const produto = await db('produtos')
            .where('id', id )
            .select('*');

        if(!id || !produto[0]){
            return response.status(400).json({ error: 'ID inexistente'})
        }

        return response.json( produto );
    },

    async delete(request, response) {
        const { id } = request.params;

        const produto = await db('produtos')
            .where('id', id )
            .delete();
        
        if(!produto) return response.status(400).json({ error: 'ID inexistente'});

        return response.status(204).send();
    },

    async update(request, response) {
        const { id } = request.params;
        const updateList = request.body;

        const produto = await db('produtos')
            .where('id', id )
            .select('*');

        if(!id || !produto[0]){
            return response.status(400).json({ error: 'ID inexistente'})
        }

        await db('produtos')
            .where('id', id )
            .update({
                nome: updateList.nome || produto[0].nome,
                descricao: updateList.descricao || produto[0].descricao,
                marca: updateList.marca || produto[0].marca,
                fornecedor: updateList.fornecedor || produto[0].fornecedor,
                classificacao: updateList.classificacao || produto[0].classificacao,
                custo: updateList.custo || produto[0].custo,
                venda: updateList.venda || produto[0].venda,
                qtd_estoque: updateList.qtd_estoque || produto[0].qtd_estoque,
                qtd_loja: updateList.qtd_loja || produto[0].qtd_loja,
                unidade_medida: updateList.unidade_medida || produto[0].unidade_medida,
            });

        return response.json({id});
    },
}