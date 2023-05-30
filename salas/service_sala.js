const express = require("express");
const Sala = require("./models/Sala");
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

app.get("/salas", async (req, res) => {
  try {
    const result = await Sala.find({});
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao buscar salas");
  }
});

app.get("/salas/:numero", async (req, res) => {
  try {
    const result = await Sala.findOne({ numero: req.params.numero });
    if (result == null) res.status(404).send("false");
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao buscar sala");
  }
});

app.post("/salas", async (req, res) => {
  try {
    const sala = new Sala({
      numero: req.body.numero,
      bloco: req.body.bloco,
    });

    try {
      await sala.save();
      console.log("sala cadastrado com sucesso");
      res.status(200).send("sala cadastrado com sucesso");
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao cadastrar sala");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao cadastrar sala");
  }
});

app.put("/salas/:numero", async (req, res) => {
  try {
    const result = await Sala.updateOne(
      { numero: req.params.numero },
      {
        $set: {
          nome: req.body.nome,
          tipo: req.body.tipo,
          codCurso: req.body.codCurso,
          setor: req.body.setor,
          numero: req.body.numero,
        },
      }
    );

    if (result.nModified == 0) res.status(404).send("sala não encontrada");

    res.status(200).send("sala alterado com sucesso");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao alterar sala");
  }
});

app.delete("/salas/:numero", async (req, res) => {
  try {
    const result = await Sala.deleteOne({ numero: req.params.numero });
    if (result.deletedCount == 0) {
      console.log("sala não encontrada");
      res.status(404).send("sala não encontrada");
    } else {
      console.log("sala deletado com sucesso");
      res.status(200).send("sala deletado com sucesso");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao deletar sala");
  }
});

const porta = 8020;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
