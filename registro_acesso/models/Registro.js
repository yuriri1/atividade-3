const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegistroSchema = new Schema({
  matricula: {
    type: String,
    required: [true, "Matricula é obrigatório"],
  },
  sala: {
    type: String,
    required: [true, "Sala é obrigatório"],
  },
  data: {
    type: String,
    required: [true, "Data é obrigatório"],
  },
  hora: {
    type: String,
    required: [true, "Hora é obrigatório"],
  },
});

module.exports = mongoose.model("Registro", RegistroSchema);
