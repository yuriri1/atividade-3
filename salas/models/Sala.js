const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SalaSchema = new Schema({
    numero: {
        type: String,
        required: [true, 'Número é obrigatório']
    },
    bloco: {
        type: String,
        required: [true, 'Bloco é obrigatório']
    },

})

module.exports = mongoose.model('Sala', SalaSchema)