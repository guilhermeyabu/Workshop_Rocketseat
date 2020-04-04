// uso do express para criar e configurar server
const express = require("express");
const server = express();
const db = require("./db");

//config arquivos estáticos como css, scripts, imagens
server.use(express.static("public"));

//habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

// const ideas = [
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//         title: "Cursos de Programação",
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laboriosam assumenda laudantiu",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//         title: "Exercícios",
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laboriosam assumenda laudantiu",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//         title: "Meditação",
//         category: "Mentalidade",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laboriosam assumenda laudantiu",
//         url: "https://rocketseat.com.br"
//     },
//     {
//         img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
//         title: "Karaokê",
//         category: "Diversão em família",
//         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod laboriosam assumenda laudantiu",
//         url: "https://rocketseat.com.br"
//     },
// ]

//config nunjuncks - permite usar variáveis no html.
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// criação de rota
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        const reversedIdeas = [...rows].reverse()
        let lastIdeas = [];
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea);
            }
        }

        return res.render("index.html", { ideas: lastIdeas });
    });


})

server.get("/ideias", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { ideas: reversedIdeas });
    });
})

server.post("/", function(req, res) {
    //Inserir dados
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);`

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err);
            return res.send("Database Error");
        } 

        return res.redirect("/ideias")
    });
});

server.post("/ideias", function(req, res) {
    //Inserir dados
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);`

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err);
            return res.send("Database Error");
        } 

        return res.redirect("/ideias")
    });
});

// server escutando na porta 3000
server.listen(3000) 