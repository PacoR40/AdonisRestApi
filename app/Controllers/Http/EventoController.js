'use strict'

const Evento = use('App/Models/Evento');
const AutorizacionService = use('App/Services/AutorizacionService');

class EventoController {

    async index({ auth }){
        const user = await auth.getUser();
        return await user.eventos().fetch();
    }

    async create({ auth, request }){
        const user = await auth.getUser();
        const { nombre, descripcion } = request.all();
        const evento = new Evento();
        evento.fill({
            nombre,
            descripcion
        });
        await user.eventos().save(evento);
        return evento;
    }

    async destroy({ auth, params }){
        const user = await auth.getUser();
        const { id } = params;
        const evento = await Evento.find(id);
        AutorizacionService.verificarPermiso(evento, user);
        await evento.delete();
        return evento;
    }

    async update({ auth, params, request }){
        const user = await auth.getUser();
        const { id } = params;
        const evento = await Evento.find(id);
        AutorizacionService.verificarPermiso(evento, user);
        evento.merge(request.only([
            'nombre',
            'descripcion'
        ]))
        await evento.save();
        return evento;
    }

}

module.exports = EventoController
