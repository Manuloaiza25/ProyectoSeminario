const express= require('express')
const routesproducto = express.Router()

routesproducto.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT producto.Codigo,producto.Nombre, producto.Cantidad, producto.Precio_compra, producto.Precio_venta, categoria.Descripcion, proveedor.Entidad FROM producto JOIN categoria ON producto.Categoria = categoria.Id JOIN proveedor ON producto.Proveedor = proveedor.Id;', (err, rows)=> {
            if(err) return res.send(err) 
            res.json(rows)
        })
    })
})

routesproducto.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('INSERT INTO producto set ?',[req.body], (err, rows)=> {
           if(err) return res.send(err)  
           res.send({"message": "Producto insertado", "status": "ok"})
        })
    })
})

routesproducto.delete('/:Codigo', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('DELETE FROM producto WHERE Codigo=? ',[req.params.Codigo], (err, rows)=> {
           if(err) return res.send(err)  
           res.send({"message": "Producto eleminada", "status": "ok"})
        })
    })
})

routesproducto.put('/:Codigo', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('UPDATE producto set ? WHERE Codigo=? ',[req.body, req.params.Codigo], (err, rows)=> {
           if(err) return res.send(err)  
            res.send({"message": "Proucto actualizado", "status": "ok"})
        })
    })
})


module.exports = routesproducto