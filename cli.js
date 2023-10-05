#!/usr/bin/env node

const pc = require("picocolors");
const { mdLinks } = require("./index");
const path = process.argv[2];
const option = {
  validate: process.argv.includes("--validate"),
  stats: process.argv.includes("--stats"),
};

mdLinks(path, option.validate)
  .then((links) => {
    
     if(option.validate && option.stats){
      const total = links.length; //representa la cantidad total de enlaces en el arreglo, obtenida mediante la propiedad length
      const unique = new Set(links.map((link) => link.href)).size;
      const broken = links.filter((link) => link.status !== 200 ).length;

      console.log("Total ", total)
      console.log("Unique ", unique)
      console.log("Broken: ", broken)
    }
    
    else if (option.stats) {
      const total = links.length; //representa la cantidad total de enlaces en el arreglo, obtenida mediante la propiedad length
      const unique = new Set(links.map((link) => link.href)).size; //El objeto Set le permite almacenar valores únicos de cualquier tipo

      console.log("Total ", pc.bgBlue(total))
      console.log("Unique ", unique)
    }
   
    else if(option.validate){
      console.log(links)
    }
    else{
      console.log(links)
    }
  })
  .catch((error) => {
    console.log(error);
  });
