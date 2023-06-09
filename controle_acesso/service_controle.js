const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const Autorizacao = require("./models/Autorizacao");

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

app.post("/controle", async (req, res) => {
  try {
    const usuario = axios({
      method: "get",
      url: `http://localhost:8010/usuarios/${req.body.matricula}`,
      responseType: "json",
    });
    const sala = axios({
      method: "get",
      url: `http://localhost:8020/salas/${req.body.sala}`,
      responseType: "json",
    });
    const [usuarioResponse, salaResponse] = await Promise.all([usuario, sala]);

    if (!usuarioResponse && !salaResponse) {
      console.log("Usuário ou sala não existem");
      return;
    }

    const autorizacao = new Autorizacao({
      matricula: req.body.matricula,
      sala: req.body.sala,
    });

    try {
      await autorizacao.save();
      console.log("Autorização cadastrada com sucesso");
      res.status(200).send("Autorização cadastrada com sucesso");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/controle", async (req, res) => {
  try {
    const result = await Autorizacao.find({});
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao buscar autorizações");
  }
});

app.get("/controle/:sala/:matricula", async (req, res) => {
  try {
    const result = await Autorizacao.findOne({
      sala: req.params.sala,
      matricula: req.params.matricula,
    });
    console.log(result);
    if (result == null) {
      res.status(200).send(false);
      return;
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

const porta = 8050;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
