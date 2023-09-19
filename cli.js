// aqui se van a visualizar las respuestas pero hasta el hito 4
const { mdLinks } = require("./index");

mdLinks("./prueba.md")
  .then((res) => {
    console.log("Promesa resuelta con éxito! " + res);
  })
  .catch((error) => {
    console.log(error + " El archivo no existe");
  });
