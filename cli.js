// aqui se van a visualizar las respuestas pero hasta el hito 4
const { mdLinks } = require("./index");

mdLinks("prueba.md")
  .then((result) => {
    console.log("resultado", result);
    console.log("Promesa resuelta con éxito!");
  })
  .catch((error) => {
    console.log(error);
  });
