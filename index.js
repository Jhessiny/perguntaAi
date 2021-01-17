const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
//DATABASE

connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.set("view engine", "ejs"); // DIZENDO PARA O EJS USAR O EXPRESS COMO VIEW ENGINE
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false })); //PERMITE O ENVIO DOS DADOS E TRADUZ PARA ESTRUTURA JS
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  res.send(
    "Formulário recebido! titulo " + titulo + " " + " descricao" + descricao
  );
});

app.listen(8080, () => {
  console.log("APP RODANDO");
});
