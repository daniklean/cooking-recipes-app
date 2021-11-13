const express = require('express')
const handlebars = require('express-handlebars')
const cors = require('cors')
const dotenv = require('dotenv')
const method = require('method-override')
const path = require('path')
const session = require('express-session')
const connect = require('connect-flash')
const passport = require('passport')
dotenv.config()


// Requiriendo db y rutas
const usuarios = require('./app/routes/users')
const recetas = require('./app/routes/recetas')
const { dbConnect } = require('./config/connectMongo')
require('./config/autenticar')

// Clase Express
const app = express()

//Puerto con variable de entorno
const port = process.env.PORT || 4000

//Motor de Plantillas Handlebars
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '/app/views'))
app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

//Middlewares
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(method('_method'))
app.use(session({
    secret: 'keysecretcarlosquintero',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(connect())

app.use((req,res,next) => {
    res.locals.accion_exitosa = req.flash('accion_exitosa')
    res.locals.accion_erronea_usuario = req.flash('accion_erronea_usuario')
    res.locals.error_receta = req.flash('error_receta')
    res.locals.error = req.flash('error')
    res.locals.user =  req.user || null
    next()
})

// Ruta iniciales + protocolos de router
app.use('/', recetas)
app.use('/', usuarios)

// Archivos Estaticos 
app.use(express.static(path.join(__dirname, '/app/public/')))

//Ejecutando db y arrancando el servidor
dbConnect()
app.listen(port, () =>  {
    console.log('Proyecto corriendo en el puerto ' + port )
})