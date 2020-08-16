const db = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { nome } = request.body;

        const insertedVendedorIds = await db('vendedores').insert({
            nome,
            active: true,
        });

        return response.json({ id: insertedVendedorIds[0]});
    },

    async index(request, response) {
        const filters = request.query;

        const vendedor = await db('vendedores')
            .where('vendedores.id','=', filters.id )
            .select('*');

        if(!filters || !vendedor[0]){
            return response.status(400).json({ error: 'ID inexistente'})
        }

        return response.json( vendedor );
    },

    async delete(request, response) {
        const { id } = request.query;

        const vendedor = await db('vendedores')
            .where('id', id )
            .update({
                active: false
            });
        
        if(!vendedor) return response.status(400).json({ error: 'ID inexistente'});

        return response.status(204).send();
    },

    async update(request, response) {
        const { id } = request.query;
        const { nome } = request.body;

        const vendedor = await db('vendedores')
            .where('vendedores.id','=', id )
            .select('*');

        if(!id || !vendedor[0]){
            return response.status(400).json({ error: 'ID inexistente'})
        }

        await db('vendedores')
            .where('vendedores.id','=', id )
            .update({
                nome
            });

        return response.json({id});
    },
}