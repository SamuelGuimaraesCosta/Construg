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
    res.status(200).send("AAAAAAAAAAA! OUTRO COMMIT TESTE");
});

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
