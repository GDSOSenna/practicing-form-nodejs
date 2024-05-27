//Importa banco de dados
const database = require('../database/database')

//Lógica dos métodos que utilizam o banco de dados

exports.getItems = async(req,res) => {
    try{
        const result = await database.pool.query(`
        SELECT l.id, l.title, l.description, l.active
        
        FROM list l
        `)

        return res.status(200).json(result.rows)
    } catch(error){
        return res.status(500).json({ error: error.message})
    }
}

exports.createItem = async(req,res) =>{
    try{
        if(!req.body.title){
            return res.status(422).json({error:"A tarefa precisa de um título para ser criada!"})
        }

        if(!req.body.description){
            return res.status(422).json({error:"A tarefa precisa de uma descrição para ser criada!"})
        }

        const result = await database.pool.query({
            text: `INSERT INTO LIST (title, description) VALUES ($1, $2) RETURNING *`,
            values: [
                req.body.title,
                req.body.description
            ]
        })

        return res.status(201).json(result.rows[0])
    } catch(error){
        return res.status(500).json({ error: error.message})
    }
}

exports.updateItem = async(req,res) =>{
    try{
        if(!req.body.title||!req.body.description){
            return res.status(422).json({error: "É necessário preencher todos os campos para realizar a alteração!"})
        }

        const existsResult = await database.pool.query({
            text:`SELECT EXISTS (SELECT *FROM list WHERE id = $1)`,
            values: [req.params.id]
        })

        if(!existsResult.rows[0].exists){
            return res.status(422).json({error: "Esse ID não existe!"})
        }

        const result = await database.pool.query({
            text: `UPDATE list SET title = $1, description = $2 WHERE id = $3 returning *`,
            values:[
                req.body.title,
                req.body.description,
                req.params.id
            ]
        })
        
        return res.status(200).json(result.rows[0])
    } catch(error){
        return res.status(500).json({ error: error.message})
    }
}

exports.deleteItem = async(req,res) =>{
    try {
        const result = await database.pool.query({
            text:`DELETE FROM list WHERE id=$1`,
            values:[
                req.params.id
            ]
        })

        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}