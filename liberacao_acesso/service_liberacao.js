const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const registrarAcesso = async (matricula, sala) => {
  try {
    const data = new Date();
    const registro = {
      matricula: matricula,
      sala: sala,
      data: `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`,
      hora: `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`,
    };

    const registroPost = axios({
      method: "post",
      url: "http://localhost:8030/registros",
      data: registro,
      responseType: "json",
    });

    const [registroResponse] = await Promise.all([registroPost]);

    console.log(registroResponse.data);

    if (!registroResponse.data) {
      console.log("Erro ao registrar acesso");
      return;
    }

    console.log("Acesso registrado com sucesso");
  } catch (error) {
    console.log(error);
  }
};

app.get("/liberacao/:sala/:matricula", async (req, res) => {
  try {
    const autorizacao = axios({
      method: "get",
      url: `http://localhost:8050/controle/${req.params.sala}/${req.params.matricula}`,
      responseType: "json",
    });

    const [autorizacaoResponse] = await Promise.all([autorizacao]);

    console.log(autorizacaoResponse.data);

    if (!autorizacaoResponse.data) {
      console.log("Usuario não tem permissão a essa sala");
      res.status(401).send("Usuario não tem permissão a essa sala");
      return;
    }

    res.status(200).send("*Abrindo porta*");
    registrarAcesso(req.params.matricula, req.params.sala);
  } catch (error) {
    console.log(error);
  }
});

const porta = 8040;
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
