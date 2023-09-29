// aqui se van a visualizar las respuestas pero hasta el hito 4
const { mdLinks } = require("./index");

mdLinks("./ejem-directorio", false)
  .then((result) => {
    console.log(result);
    console.log("Promesa resuelta con éxito!");
  })
  .catch((error) => {
    console.log(error);
  });
