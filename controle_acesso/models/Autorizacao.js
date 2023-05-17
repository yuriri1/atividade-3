const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AutorizacaoSchema = new Schema({
    matricula : {
        type: String,
        required: [true, 'Matricula é obrigatório']
    },
    sala : {
        type: String,
        required: [true, 'Sala é obrigatório']
    },

})

module.exports = mongoose.model('Autorizacao', AutorizacaoSchema)