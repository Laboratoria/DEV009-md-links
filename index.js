const fs = require('fs');
const path = require('path');
const { pathExists, isMarkdownFile, readMarkdownFile, findLinksInMarkdown } = require('./mdLink.js');

const fileName = 'miPrueba.md'; 
const filePath = path.resolve(fileName);

const mdLink = (filePath) => {
  return new Promise((resolve, reject) => {
    // aqui se comprueba que la ruta existe
    if (!pathExists(filePath)) {
      reject('La ruta no existe');
      return;
    }

    // Asegurar que el archivo es markdown
    if (!isMarkdownFile(filePath)) {
      reject('El archivo no es Markdown');
      return;
    }

    // Leer el archivo Markdown
    readMarkdownFile(filePath)
      .then((data) => {
        // voy a encontrar los links dentro del documento
        const links = findLinksInMarkdown(data);

        // vamos a resolver  el contenido completo y los enlaces encontrados
        resolve({ content: data, links });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Llamamos a la función mdLink con la ruta del archiv
mdLink(filePath)
  .then(({ content, links }) => {
    
    console.log('Contenido del archivo:');
    console.log(content);


    console.log('\nEnlaces encontrados:');
    links.forEach((link) => {
      console.log(`href: ${link.href}`);
      console.log(`text: ${link.text}`);
      console.log(`file: ${filePath}`);
      console.log(); 
    });

    // Retorna el contenido completo y los enlaces encontrados
    return { content, links };
  })
  .catch((error) => {
    console.error(error);
  });

  module.exports = {
    mdLink
  };