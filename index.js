const fs = require('fs');
const path = require('path');
const {
  extractLinks,
  isMarkdownFile,
  readFileContent,
  validateLinks,
  pathExists,
  isDirectory,
  readDir
} = require('./data.js');

const mdLinks = (directoryPath, options = {}) => {
  const absolutePath = path.resolve(directoryPath);

  return new Promise((resolve, reject) => {
    // Verificar si el camino es un archivo o directorio
    if (!pathExists(absolutePath)) {
      reject(new Error('The path is not a valid directory or file.'));
      return;
    }

    if (isDirectory(absolutePath)) {
      // Si es un directorio, obten todos los archivos .md
      const mdFiles = readDir(absolutePath, isMarkdownFile);

      if (mdFiles.length === 0) {
        reject(new Error('No Markdown files found in the directory or subdirectories.'));
        return;
      }

      // Loop a través de todos los archivos Markdown.
      const filePromises = mdFiles.map(mdFile => {
        return readFileContent(mdFile)
          .then(fileContent => extractLinks(fileContent, mdFile))
          .then(links => {
            if (options.validate) {
              return validateLinks(links);
            } else {
              return links;
            }
          });
      });

      Promise.all(filePromises)
        .then(resultArrays => {
          const allLinks = resultArrays.flat();
          resolve(allLinks);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      // Si el camino es un archivo, procesarlo directamente
      readFileContent(absolutePath)
        .then(fileContent => extractLinks(fileContent, absolutePath))
        .then(links => {
          if (options.validate) {
            return validateLinks(links);
          } else {
            return links;
          }
        })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};

module.exports = { mdLinks };
