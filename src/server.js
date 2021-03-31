'use strict';
var http = require('http');
var port = process.env.PORT || 3333;
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const router = express.Router();

var conn = mysql.createConnection({
    host: "construgmysql.mysql.database.azure.com",
    user: "construgroot", password: "construg@123",
    database: "construg",
    port: 3306
});

conn.connect(function (err) {
    if (err)
        return console.log("Falha na conexão com BD: " + err);
    return console.log("Conexão com BD realizada com sucesso! " + mysqlConn.threadId);
});

const findUserByEmail = (email, cb) => {
    conn.query(`SELECT IDUSUARIO, NOME, EMAIL, SENHA, DTNASCIMENTO, ATIVO, BLOQUEADO, MASTER, CPF FROM USUARIOS WHERE EMAIL = ?`, [email], function (error, result) {
        if (typeof result !== 'undefined' && result.length > 0) {
            cb(error, result[0]);
        } else {
            cb(error, null);
        }
    });
}

router.get('/', (req, res) => {
    res.status(200).send("Unauthorized Access!");
});

router.post("/login", cors(corsOptions), (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    findUserByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).send("Houve um erro no servidor: findUserByEmail");
        }

        if (!user) {
            return res.status(404).send("Usuario não encontrado!");
        }

        const result = bcrypt.compareSync(senha, user.SENHA);

        if (!result) {
            return res.status(401).send("Senha inválida!");
        } else {
            delete user.SENHA;
        }

        if (user.ATIVO == 0) {
            return res.status(999).send("Conta Dessativada!");
        }

        if (user.BLOQUEADO == 1) {
            return res.status(998).send("Conta Bloqueada!");
        }

        const expiresIn = 7 * 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.IDUSUARIO }, SECRET_KEY, { expiresIn: expiresIn });
        res.status(200).send({ "user": user, "TOKEN": accessToken, "EXPIRE": expiresIn })
    });
});

app.use(router);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

var serverHttp = http.createServer(app);

serverHttp.listen(port, function () {
    console.log('HTTP Express server listening on port ' + port);
});
