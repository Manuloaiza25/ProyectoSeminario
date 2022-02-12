const express= require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM categoria', (err, rows)=> {
            if(err) return res.send(err) 
            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('INSERT INTO categoria set ?',[req.body], (err, rows)=> {
           if(err) return res.send(err)  
           res.send({"message": "Categoria insertado", "status": "ok"})
        })
    })
})

routes.delete('/:Id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('DELETE FROM categoria WHERE Id = ? ',[req.params.Id], (err, rows)=> {
           if(err) return res.send(err)  
            res.send({"message": "Categoría eleminada", "status": "ok"})
            
        })
    })
})

routes.put('/:Id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('UPDATE categoria set ? WHERE Id=? ',[req.body, req.params.Id], (err, rows)=> {
           if(err) return res.send(err)  
           res.send({"message": "Categoria actualizada", "status": "ok"})
        })
    })
})


module.exports = routes