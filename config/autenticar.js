const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy 
const ModeloUsuario = require('../app/models/users')

passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contraseña'
}, async (correo, contraseña, done) => {
 const usuario = await ModeloUsuario.findOne({ correo: correo })
    if(!usuario) {
        return done(null, false, { message: 'No se encuentra el usuario' })
    } else {
        const verificar = await usuario.compararContraseña(contraseña) 
        if(verificar) {
            return done(null,usuario)
        } else {
            return done(null,false, {message: 'Contraseña Incorrecta' })
        }
    }
}))

passport.serializeUser((usuario,done) => {
    done(null,usuario.id)
});

passport.deserializeUser((id,done) => {
    ModeloUsuario.findById(id, (err,usuario) => {
        done(err,usuario)
    })
})