#!/usr/bin/env node

const { mdLinks } = require('./index.js');
const colors = require('colors');
const path = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'),
  stats: process.argv.includes('--stats')
};

mdLinks(path, options)
  .then((links) => {
    if (options.stats) {
      const totalLinks = links.length;
      const uniqueLinks = new Set(links.map(link => link.href)); // Usar Set para obtener enlaces únicos

      console.log(`Total: ${totalLinks} links`.yellow.bold)
      console.log(`Unique: ${[...uniqueLinks].length} links`.magenta.bold); // Convertir Set a un array y mostrarlo
    
      if(options.validate){
        const status = link.status

        //const failLinks = links.filter(link => link.ok ==='fail').length;
        console.log(`Fail: ${status} link`);
      }
    } else {
      console.log(links);
    }
  })
  .catch((error) => {
    console.error(error);
  });


//'C:\\Users\\Laboratoria\\DataLovers'
//'C:\\Users\\Laboratoria\\DEV009-md-links\\docs\\archivos.md'
// 'C:\\Users\\Laboratoria\\textanalyzer'
