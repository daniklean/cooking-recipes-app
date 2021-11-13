const express = require('express')
const router = express.Router()

const {
    inicio,
    agregarReceta, 
    agregarFormulario,
    buscarRecetas,
    actualizarFormulario,
    actualizarReceta,
    borrarReceta
} = require('../controllers/recetas')
const { verificar } = require('../middleware/verificar')

router.get('/', inicio)
//Buscar y agregar
router.get('/nueva/receta', verificar, agregarFormulario)
router.post('/receta/agregar', verificar, agregarReceta)

//Buscar Recetas
router.get('/recetas', verificar, buscarRecetas)

//Busscar y actualizar
router.get('/recetas/:id', verificar, actualizarFormulario)
router.put('/recetas/:id', verificar, actualizarReceta)

//Eliminar por ID
router.delete('/receta/:id', verificar, borrarReceta)

module.exports = router