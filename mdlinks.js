const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const { validateLinks } = require('./data'); // Asegúrate de que la ruta sea correcta


const mdLinks = (filePath,validate=false) => {
  const absolutePath = path.resolve(filePath);

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(absolutePath)) {
      reject(new Error('La ruta no existe.'));
      return;
    }

    if (!path.extname(absolutePath).match(/\.(md|mkd|mdwn|mdown|mdtxt|mdtext|markdown|text)$/i)) {
      reject(new Error('No es un archivo Markdown.'));
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

      let isInsideLink = false; // Variable para rastrear si estamos dentro de un enlace

      tokens.forEach((token) => {
        if (token.type === 'inline') {
          // En tokens de tipo 'inline', buscamos enlaces
          const inlineTokens = token.children;
          inlineTokens.forEach((inlineToken) => {
            if (inlineToken.type === 'link_open') {
              // Si encontramos un token de apertura de enlace
              isInsideLink = true; // Estamos dentro de un enlace
              links.push({
                href: inlineToken.attrGet('href'), // Obtenemos la URL del enlace
                text: '', // Inicializamos el texto del enlace como una cadena vacía
                file: absolutePath,
              });
            } else if (isInsideLink && inlineToken.type === 'text') {
              // Si estamos dentro de un enlace y encontramos un token de texto
              const lastLink = links[links.length - 1];
              lastLink.text += inlineToken.content; // Agregamos el texto al enlace anterior
            } else if (isInsideLink && inlineToken.type === 'link_close') {
              // Si encontramos un token de cierre de enlace
              isInsideLink = false; // Ya no estamos dentro de un enlace
            }
          });
        }
      });

      if (links.length === 0) {
        reject(new Error('No se encontraron enlaces en el archivo Markdown.'));
        return;
      }
      if (validate) {
        validateLinks(links)
          .then((validatedLinks) => {
            resolve(validatedLinks);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(links);
      }
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
