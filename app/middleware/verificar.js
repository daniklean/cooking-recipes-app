exports.verificar = (req,res,next) => {

    try {

        if(req.isAuthenticated()) {
            return next()
        } else {
            req.flash('accion_erronea_usuario', 'No tienes una sesion activa, inicia sesion para poder entrar en tus recetas')
            res.redirect('/iniciar/usuario')
        }
    } catch (error) {
        res.status(500).send('Algo ocurrio ' + error)
    }
}