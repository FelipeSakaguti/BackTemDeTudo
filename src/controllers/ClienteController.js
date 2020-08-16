const db = require('../database/connection')

module.exports = {
    async create(request, response) {
        const { nome, endereco, telefone } = request.body;

        const insertedClienteId = await db('clientes').insert({
            nome,
            endereco,
            telefone,
        });

        return response.json({ id: insertedClienteId[0]});
    },

    async index(request, response) {
        const { id } = request.params;

        const cliente = await db('clientes')
            .where('id', id )
            .select('*');

        if(!id || !cliente[0]){
            return response.status(400).json({ error: 'ID inexistente'})
        }

        return response.json( cliente );
    },

    async delete(request, response) {
        const { id } = request.params;

        const cliente = await db('clientes')
            .where('id', id )
            .delete();
        
        if(!cliente) return response.status(400).json({ error: 'ID inexistente'});

        return response.status(204).send();
    },

    async update(request, response) {
        const { id } = request.params;
        const updateList = request.body;

        const cliente = await db('clientes')
            .where('id', id )
            .select('*');

        if(!id || !cliente[0]){
            return response.status(400).json({ error: 'ID inexistente'})
        }

        await db('clientes')
            .where('id', id )
            .update({
                nome: updateList.nome || cliente[0].nome,
                endereco: updateList.endereco || cliente[0].endereco,
                telefone: updateList.telefone || cliente[0].telefone,
            });

        return response.json({id});
    },
}