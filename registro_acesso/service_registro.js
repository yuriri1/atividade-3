const express = require("express");
const Registro = require("./models/Registro");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const uri =
  "mongodb+srv://yurirsouza:ppLSRfpWSjyB1hw9@atividade-3.8dtckek.mongodb.net/?retryWrites=true&w=majority";

const app = express();

//Conexão com banco de dados
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((err) => {
    console.log("Erro ao conectar ao banco de dados");
    console.log(err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/registros", async (req, res) => {
  try {
    const registro = new Registro({
      matricula: req.body.matricula,
      sala: req.body.sala,
      data: req.body.data,
      hora: req.body.hora,
    });

    try {
      await registro.save();
      console.log("Registro cadastrado com sucesso");
      res.status(200).send("Registro cadastrado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao cadastrar registro");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/registros", async (req, res) => {
  try {
    const result = await Registro.find({});
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao buscar registros");
  }
});

const porta = 8030;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
