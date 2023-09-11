const fs = require('fs');
const path = require('path');
const { extractLinks, isMarkdownFile, readFileContent, validateLinks } = require('./data.js');

const mdLinks = (directoryPath, validate) => {
  const absolutePath = path.resolve(directoryPath);

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(absolutePath)) {
      reject(new Error('La ruta del directorio no existe.'));
      return;
    }

    if (!fs.lstatSync(absolutePath).isDirectory()) {
      reject(new Error('La ruta no es un directorio.'));
      return;
    }

    const filePromises = [];

    // Función recursiva para buscar archivos Markdown en directorios anidados
    const exploreDirectory = (currentPath) => {
      const files = fs.readdirSync(currentPath);

      files.forEach((file) => {
        const filePath = path.join(currentPath, file);

        if (fs.lstatSync(filePath).isDirectory()) {
          exploreDirectory(filePath); // Si es un directorio, explorar recursivamente
        } else if (isMarkdownFile(filePath)) {
          // Si es un archivo Markdown, agregarlo a las promesas
          filePromises.push(
            readFileContent(filePath)
              .then((fileContent) => extractLinks(fileContent, filePath))
              .then((links) => (validate ? validateLinks(links) : links))
          );
        }
      });
    };

    exploreDirectory(absolutePath);

    // Devolver una promesa que se resuelve cuando todas las promesas se resuelven
    Promise.all(filePromises)
      .then((resultArrays) => {
        // Aplanar el array de arrays resultante
        const allLinks = resultArrays.flat();
        resolve(allLinks);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { mdLinks };


