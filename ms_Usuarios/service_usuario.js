const express = require('express')
const Ususario = require('./models/Usuario')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const uri = 'mongodb+srv://yurirsouza:ppLSRfpWSjyB1hw9@atividade-3.8dtckek.mongodb.net/?retryWrites=true&w=majority'

const app = express()

//Conexão com banco de dados
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao banco de dados')
}).catch((err) => {
    console.log('Erro ao conectar ao banco de dados')
    console.log(err)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const porta = 8010
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})