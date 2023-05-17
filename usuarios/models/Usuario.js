const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UsuarioSchema = new Schema({
    nome: {
        type:String, 
        required: [true, 'Nome é obrigatório']
    },
    tipo: {
        type: String,
        required: [true, 'Tipo é obrigatório'], 
        enum: ['Aluno', 'Professor', 'Tecnico']
    },
    codCurso: {
        type: String
    },
    setor: {
        type: String
    },
    matricula: {
        type: String, 
        required: [true, 'Matricula é obrigatório']
    }
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
