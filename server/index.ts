import express from 'express'
const app = express()
import mysql from 'mysql2'
import cors from 'cors'
import 'dotenv/config'

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.use(cors())
app.use(express.json())

app.post('/register', (req, res) => {
    const {name, cost, category} = req.body
    let sql = "INSERT INTO games (name, cost, category) VALUES (?, ?, ?)"
    db.query(sql, [name, cost, category], (erro, result) => {
        if(erro) console.log("Erro:", erro)
        else res.json(result)
    })
})

app.get('/getCards', (req, res) => {
    let sql = "SELECT * FROM games"
    db.query(sql, (erro, result) => {
        if(erro) console.log("Erro:", erro)
        else res.json(result)
    })
})

app.put('/edit', (req, res) => {
    const {id, name, cost, category} = req.body
    let sql = "UPDATE games SET name = ?, cost = ?, category = ? WHERE idgames = ?"
    db.query(sql, [name, cost, category, id], (erro, result) => {
        if(erro) console.log("Erro:", erro)
        else res.json(result)
    })
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params
    let sql = "DELETE FROM games WHERE idgames = ?"
    db.query(sql, [id], (erro, result) => {
        if(erro) console.log("Erro:", erro)
        else res.json(result)
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor Rodando na porta ${process.env.PORT}`)
})