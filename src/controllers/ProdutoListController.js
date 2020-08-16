const db = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { nome, page = 1 } = request.query;

        const [count] = await db('produtos').count();
        
        response.header('X-Total-Count', count['count(*)'])

        if(!nome){
            const produtos = await db('produtos')
                .limit(10)
                .offset((page-1)*10)
                .select('*');

            return response.json( produtos );
        }
        
        const produtos = await db('produtos')
            .where('nome','LIKE', `%${nome}%`)
            .limit(10)
            .offset((page-1)*10)
            .select('*');

        return response.json( produtos );
    }
}