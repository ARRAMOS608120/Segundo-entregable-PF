import express from 'express'
import exphbs from 'express-handlebars'

const app = express()

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

app.engine('hbs', exphbs({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))
app.set('view engine', 'hbs')
app.set('views', './views')

import { routerCarrito, routerProductos } from './rutas.js'
/* ------------------------------------------------------ */
/* Cargo los routers */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/carrito',routerCarrito)
app.use('/api/productos',routerProductos)
app.use(function (req, res, next) {
    const rutaincorrecta= {error:-2, descripcion: `Ruta ${req.url} metodo ${req.method} no implementada`}
    res.send(rutaincorrecta)
    next();
  });
  
  
/* ------------------------------------------------------ */

/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))

