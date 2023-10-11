#!/usr/bin/env node

const { linksStst, stats_Validate} = require ("./src/data.js")
const { mdLinks } = require("./src/mdlink");


const argv = process.argv;
const file = process.argv[2];
const stats = argv.includes('--stats');
const validate = argv.includes('--validate'); 

if(file === undefined){
  console.log('Error: se necesita una ruta');
  return;
}


mdLinks(file, validate)
  .then((result) => {
    if(stats && !validate){
        console.log(linksStst(result));
    }else if (stats && validate){
        console.log(stats_Validate(result));
    } else {
        console.log(result);
    }
  })
  .catch((error) => {
    console.log(error);
  });
// Prueba de código
