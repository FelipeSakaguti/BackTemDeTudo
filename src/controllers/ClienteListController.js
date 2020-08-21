const db = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { nome, page = 1 } = request.query;

        const [count] = await db('clientes').count();
        
        response.header('X-Total-Count', count['count(*)'])

        if(!nome){
            const clientes = await db('clientes')
                .select('*');

            return response.json( clientes );
        }
        
        const clientes = await db('clientes')
            .where('nome','LIKE', `%${nome}%`)
            .select('*');

        return response.json( clientes );
    }
}