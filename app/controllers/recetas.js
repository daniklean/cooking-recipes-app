const ModeloRecetas = require('../models/recetas')

exports.inicio = (req,res) => {
    try {
        res.render('index')
    } catch(error) {
        res.status(500).send('Ocurrio un error interno ' + error)
    }
}

exports.agregarFormulario = async (req,res) => {
    try {
        await res.render('recetas/receta-form')
    } catch(error) {
        res.status(500).send('Ocurrio un error interno ' + error)
    }
}

exports.agregarReceta = async (req,res) => {
    try {
        const {
            titulo,
            descripcion,
            ingredientes,
            autor
        } = req.body
        const usuario = req.user.id
        const error_receta = []
        if(!titulo){
            error_receta.push({error: 'Debes colocar un titulo a la receta'})
        }
        if(!descripcion){
            error_receta.push({error: 'Debes colocar una descripcion a la receta'})
        }
        if(!ingredientes){
            error_receta.push({error: 'Debes colocar los ingredientes de la receta'})
        }
        if(!autor){
            error_receta.push({error: 'Debes colocar un nombre de autor a la receta'})
        } 
        if(error_receta.length > 0) {
            res.render('recetas/receta-form', {
                error_receta,
                titulo,
                descripcion,
                ingredientes,
                autor
            })
        } else {
            const recetaAgregar = await ModeloRecetas.create({
                titulo,
                ingredientes,
                descripcion,
                autor,
                usuario: usuario
            })
            recetaAgregar.save()
            req.flash('accion_exitosa', 'Se ha procesado con Exito')
            res.redirect('/recetas')
        }
    } catch(error) {
        res.status(500).send('Ocurrio un error interno ' + error)
    }
}

exports.buscarRecetas = async (req,res) => {
    try {
        const usuario = req.user.id
        const listarTodos = await ModeloRecetas.find({usuario: usuario})
        res.render('recetas/recetas-todas', { listarTodos })
    } catch(error) {
        res.status(500).send('Ocurrio un error interno ' + error)
    }
}

exports.actualizarFormulario = async (req,res) => {
    try {
        const id = req.params.id
       	const usuario = req.user.id
        const actualizar = await ModeloRecetas.findById({"_id":id})
        if(actualizar.usuario != usuario){
           req.flash('accion_erronea_usuario', 'Solo el usuario de esta receta puede modificarla')
           return res.redirect('/recetas')
        }
        res.render('recetas/actu-form', {  actualizar })
    } catch(error) {
        res.status(500).send('Ocurrio un error interno ' + error)
    }
}

exports.actualizarReceta = async (req,res) => {
    try {
        const id = req.params.id
        const actualizarReceta = await ModeloRecetas.updateOne({"_id":id}, req.body)
        actualizarReceta
        req.flash('accion_exitosa', 'Se ha actualizado con exito')
        res.redirect('/recetas')
    } catch(error) {
        res.status(500).send('Ocurrio un error interno ' + error)
    }
}

exports.borrarReceta = async (req,res) => {
    try {
        const id = req.params.id
        const usuario = req.user.id
        const eliminar = await ModeloRecetas.findOneAndDelete({"_id":id})
        if(eliminar.usuario != usuario) {
            req.flash('accion_erronea_usuario', 'Solo el usuario de esta receta puede eliminarla')
            res.redirect('/recetas')
        } else {
        eliminar    
		req.flash('accion_exitosa', 'Has eliminado corectamente la receta')
		res.redirect('/recetas')
	}
    } catch(error) {
        res.status(500).send('Ocurrio un error interno ' + error)
    }
}
