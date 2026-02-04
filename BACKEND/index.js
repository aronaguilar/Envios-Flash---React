const express = require("express");
const router = require("./router/users");
const cors = require("cors")

const app = express();
app.use(express.json());

app.use(cors());
app.use(router);



// inicia el servidor en el puerto 7050
app.listen(8080, () => console.log("SERVIDOR ESCUCHANDO EN EL PUERTO 8080"));