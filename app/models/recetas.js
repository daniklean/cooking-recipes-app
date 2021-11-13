const mongoose = require('mongoose')

const RecetaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    ingredientes: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required:true
    }
   
},
{ 
    timestamps: true,
    versionKey: false,
}) 
module.exports = mongoose.model('recetas', RecetaSchema) 