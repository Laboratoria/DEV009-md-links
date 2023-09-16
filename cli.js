#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const { handleError,seeStats } = require('./data.js');
const colors = require('colors');

const argv = process.argv;
const mdPath = process.argv[2];
const validOptions = ["--validate", "--stats"];

if (argv.length < 3) {
  console.error(colors.red("Error: Path is required."))
  return;
}

const cli = (path, argv) => {
  let options = { validate: false };
  if (argv.includes("--validate")) {
    options.validate = true;
  }

  mdLinks(path, options)
  .then((result) => {
    if (argv.includes("--stats")) { // Verifica si se proporciona la opción "--stats"
      console.log(seeStats(result)); // Utiliza "seeStats" para mostrar estadísticas
    } else {
      result.forEach((link) => {
        if (options.validate) {
          console.log(`${link.file} ${link.href} ${link.ok} ${link.text}`);
        } else {
          console.log(`${link.file} ${link.href} ${link.text}`);
        }
      });
    }
  })
  .catch(handleError);

};

cli(mdPath, argv);
