// TODO: Caso queira fazer uma validação mais avançada, utilizar o validator

const bodyParser = require("body-parser");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const app = express();
const cookieParser = require("cookie-parser");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser("nodejs"));
app.use(session({
    secret: "keyboard-cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60_000 }
}))

app.use(flash())

app.get("/", (req, res) => {

    var emailError = req.flash("emailError");
    var pontosError = req.flash("pontosError");
    var nomeError = req.flash("nomeError");
    // var email = req.flash("email");
    // var pontos = req.flash("pontos");
    // var nome = req.flash("nome");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    pontosError = (pontosError == undefined || pontosError.length == 0) ? undefined : pontosError;
    nomeError = (nomeError == undefined || nomeError.length == 0) ? undefined : nomeError;
    // email = (email == undefined || email.length == 0) ? "" : email;
    // pontos = (pontos == undefined || pontos.length == 0) ? "" : pontos;
    // nome = (nome == undefined || nome.length == 0) ? "" : nome 

    res.render("index", {emailError, pontosError, nomeError, email: req.flash("email"), pontos: req.flash("pontos"), nome: req.flash("nome")});
})

app.post("/form", (req, res) => {
    var { email, nome, pontos } = req.body;

    var emailError;
    var pontosError;
    var nomeError;

    if (email == undefined || email == "") {
        emailError = " O e-mail não pode ser vazio.";
    }

    if (pontos == undefined || pontos < 20) {
        pontosError = " Você não pode ter menos de 20 pontos.";
    }

    if (nome == undefined || nome == "") {
        nomeError = " O nome não pode ser vazio.";
    }

    if (emailError != undefined || pontosError != undefined || nomeError != undefined) {
        req.flash("emailError", emailError);
        req.flash("pontosError", pontosError);
        req.flash("nomeError", nomeError);

        req.flash("email", email);
        req.flash("pontos", pontos);
        req.flash("nome", nome);

        res.redirect("/");
    } else {
        res.send("SHOW DE BOLA ESSE FORM!");
    }
});

app.listen(8080, (req, res) => {
    console.log("Servidor rodando!");
});