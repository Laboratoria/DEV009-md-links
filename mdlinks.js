const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');

const mdLinks = (filePath) => {
  const absolutePath = path.resolve(filePath); 

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

      tokens.forEach((token, index) => {
        if (token.type === 'link_open' && token.href) {
          const nextToken = tokens[index + 1];
          if (nextToken && nextToken.type === 'text') {
            links.push({
              href: token.href,
              text: nextToken.content,
              file: absolutePath,
            });
          }
        }
      });

      if (links.length === 0) {
        reject(new Error('No se encontraron enlaces en el archivo Markdown.'));
        return;
      }

      return(links);
    });
  });
};

module.exports = { mdLinks };


/*/ Función para identificar si la ruta existe
const pathExists = (file) => {
  return fs.existsSync(file);
}

// Función que verifica si el archivo es markdown devolviendo un booleano
const isMarkdownFile = (file) => {
  return path.extname(file) === '.md';
}

// Función para verificar si el archivo es de tipo Markdown devolviendo una promesa
const verifyMarkdown = (file) => {
  if (!isMarkdownFile(file)) {
    return Promise.reject(new Error('El archivo no es un archivo Markdown (.md).'));
  }
  return Promise.resolve(file);
}

// Función para leer el contenido del archivo
function readFileContent(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, fileContent) => {
      if (error) {
        return reject(error);
      }
      resolve({ file, fileContent });
    });
  });
}

// Función para extraer los enlaces del contenido del archivo utilizando markdown-it
const extractLinks = ({ file, fileContent }) => {
  const md = new MarkdownIt();
  const tokens = md.parse(fileContent, {});

  const links = [];

  tokens.forEach((token, index) => {
    if (token.type === 'link_open' && token.href) {
      const nextToken = tokens[index + 1];
      if (nextToken && nextToken.type === 'text') {
        links.push({
          href: token.href,
          text: nextToken.content,
          file: file,
        });
      }
    }
  });

  return links;
}

module.exports = { pathExists, isMarkdownFile, verifyMarkdown, readFileContent, extractLinks }; */
