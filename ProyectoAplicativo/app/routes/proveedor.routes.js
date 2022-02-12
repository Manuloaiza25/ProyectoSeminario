const express= require('express')
const routesproveedor = express.Router()

routesproveedor.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM proveedor', (err, rows)=> {
            if(err) return res.send(err) 
            res.json(rows)
        })
    })
})

routesproveedor.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('INSERT INTO proveedor set ?',[req.body], (err, rows)=> {
           if(err) return res.send(err)  
           res.send({"message": "Proveedor insertado", "status": "ok"})
        })
    })
})

routesproveedor.delete('/:Id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('DELETE FROM proveedor WHERE Id = ? ',[req.params.Id], (err, rows)=> {
           if(err) return res.send(err)  
           res.send({"message": "Proveedor eliminado", "status": "ok"})
        })
    })
})

routesproveedor.put('/:Id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('UPDATE proveedor set ? WHERE Id=? ',[req.body, req.params.Id], (err, rows)=> {
           if(err) return res.send(err)  
           res.send({"message": "Proveedor actualizado", "status": "ok"})
        })
    })
})


module.exports = routesproveedor