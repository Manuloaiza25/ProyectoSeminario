const express= require('express')
const routesfarmacia = express.Router()

routesfarmacia.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM farmacia', (err, rows)=> {
            if(err) return res.send(err) 
            res.json(rows)
        })
    })
})

routesfarmacia.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('INSERT INTO farmacia set ?',[req.body], (err, rows)=> {
           if(err) return res.send(err)  
           res.send({"message": "Farmacia insertada", "status": "ok"})
        })
    })
})

routesfarmacia.delete('/:Id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('DELETE FROM farmacia WHERE Id = ? ',[req.params.Id], (err, rows)=> {
           if(err) return res.send(err)  
           res.send({"message": "Farmacia eleminada", "status": "ok"})
        })
    })
})

routesfarmacia.put('/:Id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        //console.log(req.body)
        conn.query('UPDATE farmacia set ? WHERE Id=? ',[req.body, req.params.Id], (err, rows)=> {
           if(err) return res.send(err)  
           res.send({"message": "Farmacia actualizada", "status": "ok"})
        })
    })
})

module.exports = routesfarmacia