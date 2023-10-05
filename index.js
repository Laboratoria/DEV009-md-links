const { mdLinks } = require("./src/mdlink");
let mdFiles = './src';
let validate = false;
mdLinks(mdFiles, validate)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
// Prueba de código
