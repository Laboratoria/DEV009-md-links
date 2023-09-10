const { mdLinks }= require('./mdlinks');
let colors = require('colors');

mdLinks('./example.md')
  .then(links => {
    console.log('Enlaces encontrados:');
    links.forEach(link => {
      console.log(`Texto: ${link.text}`);
      console.log(`URL: ${link.href}`);
      console.log(`Path: ${link.file}`);
      console.log('---');
    });
  })
  .catch(error => console.error(error.message));

 mdLinks('./example.md',true)
  .then(links => {
    console.log('Enlaces encontrados:');
    links.forEach(link => {
      console.log(`Texto: ${link.text}`);
      console.log(`URL: ${link.href}`);
      console.log(`Path: ${link.file}`);
      console.log(`Status: ${link.status}`.yellow);
      console.log(`OK: ${link.ok}`);
      console.log('---');
    });
  })
  .catch(error => console.error(error.message));

mdLinks('./example.md',false)
  .then(links => {
    console.log('Enlaces encontrados:');
    links.forEach(link => {
      console.log(`Texto: ${link.text}`);
      console.log(`URL: ${link.href}`);
      console.log(`Path: ${link.file}`);
      console.log('---');
    });
  })
  .catch(error => console.error(error.message));