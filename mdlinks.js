const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

function mdLinks(filePath) {
  const absolutePath = path.resolve(filePath); // Convierte la ruta a absoluta
  
  return new Promise((resolve, reject) => {

    if (!fs.existsSync(absolutePath)) {
      reject(new Error('El archivo no existe.'));
      return;
    }

    if (!absolutePath.toLowerCase().endsWith('.md')) {
      reject(new Error('El archivo no es un archivo Markdown (.md).'));
      return;
    }

    fs.readFile(absolutePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Error al leer el archivo.'));
        return;
      }

      const md = new MarkdownIt();
      const tokens = md.parse(data, {});

      const links = [];
      
      tokens.forEach(token => {
        if (token.type === 'link_open') {
          const linkHref = token.attrGet('href');
          const linkText = token.attrGet('title') || ''; 
          links.push({ href: linkHref, text: linkText });
        }
      });

        if (links.length === 0) {
          reject(new Error('No se encontraron enlaces en el archivo Markdown.'));
          return;
        }

      resolve(links);
    });
  });
}
module.exports= { mdLinks };