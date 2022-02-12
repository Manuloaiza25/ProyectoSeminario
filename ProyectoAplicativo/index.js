const express= require('express')
const mysql = require('mysql')
const cors=require('cors');
const app=express();
const myconn = require('express-myconnection')
const routes = require('./app/routes/categoria.routes')
const routesfarmacia = require('./app/routes/farmacia.routes')
const routesproveedor = require('./app/routes/proveedor.routes')
const routesproducto = require('./app/routes/producto.routes')
app.use(cors());

const { send } = require('express/lib/response')

app.set('port',process.env.PORT || 3000)

const dbOptions={
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database:'proyecto'
}

//basededatos
app.use(myconn(mysql,dbOptions, 'single'))
app.use(express.json())

//ruta
app.get('/',(req, res)=>{
    res.send('Bienvenido')
})

app.use('/categorias', routes)
app.use('/farmacia', routesfarmacia)
app.use('/proveedor', routesproveedor)
app.use('/producto', routesproducto)



//servidor
app.listen(app.get('port'), () =>{
    console.log('Aplicacion por el puerto',app.get('port'))
})
