// uso do express para criar e configurar server
const express = require("express");
const server = express();

//config arquivos estáticos como css, scripts, imagens

server.use(express.static("front-end"))

// criação de rota
server.get("/", function(req, res) {
    return res.sendFile(__dirname + "/front-end/index.html")
})

// server escutando na porta 3000
server.listen(3000)