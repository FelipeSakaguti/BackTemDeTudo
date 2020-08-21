const db = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await db('vendas').count();
        
        response.header('X-Total-Count', count['count(*)'])

        const vendas = await db('vendas')
            .leftJoin('clientes', 'vendas.id_cliente', '=', 'clientes.id')
            .leftJoin('produtos', 'vendas.id_produto', '=', 'produtos.id')
            .leftJoin('vendedores', 'vendas.id_vendedor', '=', 'vendedores.id')
            .select(['vendas.*', 'clientes.nome as nome_cliente', 'produtos.nome as nome_produto', 'vendedores.nome as nome_vendedor']);

        return response.json( vendas );
    }
}