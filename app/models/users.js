const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
   
},
{ 
    timestamps: true,
    versionKey: false,
}) 

UsuarioSchema.methods.encriptarContraseña = async contraseña => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(contraseña, salt)
}

UsuarioSchema.methods.compararContraseña = async function(contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña)
}

module.exports = mongoose.model('usuarios', UsuarioSchema) 