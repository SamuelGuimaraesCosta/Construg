'use strict';
var http = require('http');
var port = process.env.PORT || 3333;
const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mysql = require('mysql');
const fs = require("fs");

const app = express();
const router = express.Router();

var conn = mysql.createConnection({
    host: "pesquisamysql.mysql.database.azure.com",
    user: "rootpesquisa", password: "{pesquisa@123}",
    database: "{your_database}",
    port: 3306
});

router.get('/teste', (req, res) => {
    res.status(200).send("AAAAAAAAAAA! COMMIT TESTE");
});

router.get('/teste1', (req, res) => {
    res.status(200).send("TESTE 1");
});

router.get('/', (req, res) => {
    res.status(200).send("Unauthorized Access!");
});

app.use(router);

var serverHttp = http.createServer(app);

serverHttp.listen(port, function () {
    console.log('HTTP Express server listening on port ' + port);
});