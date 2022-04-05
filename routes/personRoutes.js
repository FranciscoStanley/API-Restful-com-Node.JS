const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

//Rotas API
//Criação de dados
router.post("/", async (req, res) => {
  //req.body
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: "O nome é obrigatório!" });
    return;
  }

  const person = {
    name,
    salary,
    approved,
  };

  //Criando os dados
  try {
    await Person.create(person);
    res
      .status(201)
      .json({ message: "Usuário inserida no sistema com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Retorno de dados
router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  //Extrair os dados da requisição, pela url = req.params
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: "Esse usuário não foi encontrada!!!" });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Atualização do dados. Atualização parcial dos dados com PATCH / Atualização de tudo com PUT!!
router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);

    if (updatePerson.matchedCount === 0) {
      res.status(422).json({
        message:
          "Essa usuário não foi encontrada, e não houve nenhuma alteração!",
      });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Remover dados / Deletar dados
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ message: "A usuário não pode ser encontrada!" });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: "Usuário removido com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
