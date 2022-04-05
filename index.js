// Config inicial
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

//  Ler JSON / Middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

//JSON
app.use(express.json());

//Rotas API
const personRoutes = require("./routes/personRoutes");
//Middleawares
app.use("/person", personRoutes);

// Rota inicial / endpoint
app.get("/", (req, res) => {
  // view request

  // response
  res.json({ message: "Hello Christ! I love you sir!" });
});

//Criar constantes para login e password
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

// Entregar uma porta.
// conexão com banco.
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.7xebe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to mongodb");
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Listening at the door ${port}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
