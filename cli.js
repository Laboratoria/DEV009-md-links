#!/usr/bin/env node

const { mdLinks} = require('./index.js');
const path = process.argv[2];
const options = process.argv.slice(3);


mdLinks(path, options)
.then((links) => {
    console.log(links);
})
.catch((error) => {
    console.error(error);
});

//'C:\\Users\\Laboratoria\\DataLovers'
//'C:\\Users\\Laboratoria\\DEV009-md-links\\docs\\archivos.md'
