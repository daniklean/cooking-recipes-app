const ModeloUsuarios = require('../models/users')
const passport = require('passport')

exports.llevarRegistrarse = async (req,res) => {

    try {
        res.render('users/registrarse')
    } catch (error) {
        res.status(500).send('Ocurrio un error ' + error)
    }
}
 
exports.registrarse = async (req,res) => {

    try {
        const erroresMsg = []
        const {
            nombre,
            correo, 
            contraseña, 
            confirmar_contr
        } = req.body

        if(contraseña != confirmar_contr) {
            erroresMsg.push({texto: 'La contraseña no es igual'})
        }
        if(contraseña.length < 4) {
            erroresMsg.push({texto: 'Contraseña deben ser mayor a 4'})
        }
        if(erroresMsg.length > 0) {
            res.render('users/registrarse', {
                erroresMsg, nombre, correo
            })
        } else {

            const correoUsuario = await ModeloUsuarios.findOne({correo:correo});
            
            if(correoUsuario) {
                req.flash('accion_erronea_usuario', 'Cambia de correo, esta en uso')
                res.redirect('/mandar/usuario')
            } else {
                const usuarioNuevo = await ModeloUsuarios.create({
                    nombre,
                    correo,
                    contraseña
                    })
                usuarioNuevo.contraseña = await usuarioNuevo.encriptarContraseña(contraseña)
                await usuarioNuevo.save()
                req.flash('accion_exitosa', 'Estas registrado')
                res.redirect('/iniciar/usuario')
            }
        } 
    } catch (error) {
        res.status(500).send('Ocurrio un error ' + error)
    }

}

exports.llevarIniciarSesion = async (req,res) => {

    try {
         res.render('users/iniciarsesion')
    } catch (error) {
        res.status(500).send('Ocurrio un error ' + error)
    }
}
exports.iniciarSesion = passport.authenticate('local', {
    failureRedirect: '/iniciar/usuario',
    successRedirect: '/recetas',
    failureFlash: true
})

exports.salir = async (req,res) => {
    
    try {
        req.logout()
        req.flash('accion_exitosa', 'Saliste de la sesion')
        res.redirect('/')
    } catch (error) {
        res.status(500).send('Ocurrio un error ' + error)
    }
}
