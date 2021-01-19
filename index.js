const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const { raw } = require("body-parser");
const Resposta = require("./database/Resposta");
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
  Pergunta.findAll({
    raw: true,
    order: [
      ["id", "DESC"], //ASC = CRESCENTE || DESC = DECRESCENTE
    ],
  }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      //Pergunta encontrada
      Resposta.findAll({
        where: { perguntaId: pergunta.id },
        order:[
          ['id', 'DESC']
        ]
      }).then((respostas) => {
        res.render("pergunta", {
          pergunta: pergunta,
          repostas: respostas
        });
      });
    } else {
      //NÃO ENCONTRADA
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId,
  }).then(() => {
    res.redirect("/pergunta/" + perguntaId);
  });
});

app.listen(3000, () => {
  console.log("APP RODANDO");
});
