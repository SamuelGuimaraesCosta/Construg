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
    user: "construgroot", password: "pesquisa@123",
    database: "construg",
    port: 3306
});

router.get('/', (req, res) => {
    res.status(200).send("Unauthorized Access!");
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
