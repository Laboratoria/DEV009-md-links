const path = require('path');
const { pathExists, isMarkdownFile, readMarkdownFile, findLinksInMarkdown, validateLink } = require('./mdLink.js');

const mdLink = (filePath, validate = false) => {
  return new Promise((resolve, reject) => {
    // Comprobar que la ruta existe
    if (!pathExists(filePath)) {
      reject('La ruta no existe');
      return;
    }

    // Asegurar que el archivo es Markdown
    if (!isMarkdownFile(filePath)) {
      reject('El archivo no es Markdown');
      return;
    }

    // Leer el archivo Markdown
    readMarkdownFile(filePath)
      .then((data) => {
        // Encontrar los links dentro del documento
        const links = findLinksInMarkdown(data);

        if (validate) {
          // Si se desea validar, realizar la validación de cada enlace
          const linkPromises = links.map((link) => validateLink(link));
          Promise.all(linkPromises)
            .then((validatedLinks) => {
              resolve(validatedLinks);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          // Si no se desea validar, resolver solo los enlaces encontrados
          resolve(links);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const fileName = 'miPrueba.md'; // Cambia el nombre del archivo si es necesario
const filePath = path.resolve(fileName);

// Llamamos a la función mdLink con la ruta del archivo y opcionalmente con validate = true
mdLink(filePath, true)
  .then((links) => {
    console.log('Enlaces encontrados con validación:');
    links.forEach((link) => {
      console.log(`href: ${link.href}`);
      console.log(`text: ${link.text}`);
      console.log(`file: ${filePath}`);
      console.log(`status: ${link.status}`);
      console.log(`ok: ${link.ok}`);
      console.log();
    });
  })
  .catch((error) => {
    console.error(error);
  });
