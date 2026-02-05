const express = require("express");
const router = require("./router/users");
const cors = require("cors")

const app = express();
app.use(express.json());

app.use(cors());
app.use(router);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log("SERVIDOR ESCUCHANDO EN EL PUERTO " + PORT)
);