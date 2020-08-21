const db = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { nome, page = 1 } = request.query;

        const [count] = await db('produtos').count();
        
        response.header('X-Total-Count', count['count(*)'])

        if(!nome){
            const produtos = await db('produtos')
                // .limit(30)
                // .offset((page-1)*30)
                .orderBy('id','desc')
                .select('*');

            return response.json( produtos );
        }
        
        const produtos = await db('produtos')
            .where('nome','LIKE', `%${nome}%`)
            // .limit(30)
            // .offset((page-1)*30)
            .select('*');

        return response.json( produtos );
    }
}