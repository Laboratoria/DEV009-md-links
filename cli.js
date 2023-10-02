#!/usr/bin/env node

const { mdLinks } = require('./index.js');
const colors = require('colors');
const path = process.argv[2];
const options = {
    validate: process.argv.includes('--validate'),
    stats: process.argv.includes('--stats')
};

mdLinks(path, options.validate)
    .then((links) => {
        if (options.stats) {
            const totalLinks = links.length;
            const uniqueLinks = new Set(links.map(link => link.href)); // Usar Set para obtener enlaces únicos

            console.log(colors.magenta.bold(`Total: ${totalLinks} links`));
            console.log(colors.cyan.bold(`Unique: ${[...uniqueLinks].length} links`)); // Convertir Set a un array y mostrarlo
            if(options.validate){
                const failLinks = links.filter(link => link.status !== 200).length;
                console.log(colors.yellow.bold(`Broken: ${failLinks} links`));
                const successLinks = links.filter(link => link.status === 200).length;
                console.log(colors.white.bold(`Success: ${successLinks} links`));
            }
        }

        else {
            console.log(links);
            
        } 
        }
        
    )
    .catch((error) => {
        console.error(error);
    });




//'C:\\Users\\Laboratoria\\DataLovers'
//'C:\\Users\\Laboratoria\\DEV009-md-links\\docs\\archivos.md'
// 'C:\\Users\\Laboratoria\\textanalyzer'
