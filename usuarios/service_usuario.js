const express = require("express");
const Usuario = require("./models/Usuario");
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

app.get("/usuarios", async (req, res) => {
  try {
    const result = await Usuario.find({});
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao buscar usuários");
  }
});

app.get("/usuarios/:matricula", async (req, res) => {
  try {
    const result = await Usuario.findOne({ matricula: req.params.matricula });
    if (result == null) res.status(404).send("Usuário não encontrado");
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao buscar usuário");
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const usuario = new Usuario({
      nome: req.body.nome,
      tipo: req.body.tipo,
      codCurso: req.body.codCurso,
      setor: req.body.setor,
      matricula: req.body.matricula,
    });

    try {
      await usuario.save();
      console.log("Usuário cadastrado com sucesso");
      res.status(200).send("Usuário cadastrado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao cadastrar usuário");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao cadastrar usuário");
  }
});

app.put("/usuarios/:matricula", async (req, res) => {
  try {
    const result = await Usuario.updateOne(
      { matricula: req.params.matricula },
      {
        $set: {
          nome: req.body.nome,
          tipo: req.body.tipo,
          codCurso: req.body.codCurso,
          setor: req.body.setor,
          matricula: req.body.matricula,
        },
      }
    );

    if (result.nModified == 0) res.status(404).send("Usuário não encontrado");

    res.status(200).send("Usuário alterado com sucesso");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao alterar usuário");
  }
});

app.delete("/usuarios/:matricula", async (req, res) => {
  try {
    const result = await Usuario.deleteOne({ matricula: req.params.matricula });
    if (result.deletedCount == 0) {
      console.log("Usuário não encontrado");
      res.status(404).send("Usuário não encontrado");
    } else {
      console.log("Usuário deletado com sucesso");
      res.status(200).send("Usuário deletado com sucesso");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao deletar usuário");
  }
});

const porta = 8010;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
