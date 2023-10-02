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

            console.log(`Total: ${totalLinks} links`.magenta.bold);
            console.log(`Unique: ${[...uniqueLinks].length} links`.cyan.bold); // Convertir Set a un array y mostrarlo
        }

        if (options.validate) {
            const successLinks = links.filter(link => link.status === 200).length;
            const failLinks = links.filter(link => link.status !== 200).length;
            console.log(`Success: ${successLinks} links`.white.bold);
            console.log(`Fail: ${failLinks} links`.yellow.bold);
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
