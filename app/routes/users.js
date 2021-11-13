const express = require('express')
const router = express.Router()

const { 
    llevarRegistrarse, 
    registrarse, 
    llevarIniciarSesion, 
    iniciarSesion,
    salir
} = require('../controllers/users')

// Registrarse
router.get('/mandar/usuario', llevarRegistrarse)
router.post('/registar/usuario', registrarse)

//Iniciar Sesion
router.get('/iniciar/usuario', llevarIniciarSesion)
router.post('/sesion/usuario', iniciarSesion)

// Salir de la sesion
router.get('/salir', salir)

module.exports = router