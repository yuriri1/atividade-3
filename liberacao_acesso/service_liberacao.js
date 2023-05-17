const express = require('express')
const bodyParser = require('body-parser')


const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/liberacao', async (req, res) => {
    //
})

const porta = 8040
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})