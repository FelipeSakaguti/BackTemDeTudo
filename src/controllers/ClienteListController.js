const db = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { nome, page = 1 } = request.query;

        const [count] = await db('clientes').count();
        
        response.header('X-Total-Count', count['count(*)'])

        if(!nome){
            const clientes = await db('clientes')
                .limit(10)
                .offset((page-1)*10)
                .select('*');

            return response.json( clientes );
        }
        
        const clientes = await db('clientes')
            .where('nome','LIKE', `%${nome}%`)
            .limit(10)
            .offset((page-1)*10)
            .select('*');

        return response.json( clientes );
    }
}