const db = require('../database/connection')

module.exports = {
    async index(request, response) {
        const { nome, page = 1 } = request.query;

        const [count] = await db('vendedores').count().where('active',true);
        
        response.header('X-Total-Count', count['count(*)'])

        if(!nome){
            const vendedores = await db('vendedores')
                .limit(10)
                .offset((page-1)*10)
                .andWhere('active',"=",true)
                .select('*');


            return response.json( vendedores );
        }
        
        const vendedores = await db('vendedores')
            .where('vendedores.nome','LIKE', `%${nome}%`)
            .andWhere('active',"=",true)
            .limit(10)
            .offset((page-1)*10)
            .select('*');

        return response.json( vendedores );
    }
}