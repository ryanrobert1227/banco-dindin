const express = require("express");
const cors = require("cors");
const roteador = require("./Routers/router");

const app = express();

app.use(express.json());
app.use(cors());

app.use(roteador);

app.listen(3000);

module.exports = app;
