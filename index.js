const fs = require('fs');
const path = require('path');
const { extractLinks, isMarkdownFile, readFileContent, validateLinks, pathExists, isDirectory } = require('./data.js');

const mdLinks = (directoryPath, validate) => {
  const absolutePath = path.resolve(directoryPath);

  return new Promise((resolve, reject) => {
    // Verificar si el camino es un archivo
    if (!fs.existsSync(absolutePath)) {
      reject(new Error('The path is not a valid directory or file.'));
      return;
    }

    // Verificar si el camino es un directorio
    if (fs.statSync(absolutePath).isDirectory()) {
      const filePromises = [];

      const exploreDirectory = (dir) => {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
          const filePath = path.join(dir, file);

          if (isMarkdownFile(filePath)) {
            filePromises.push(
              readFileContent(filePath)
                .then((fileContent) => extractLinks(fileContent, filePath))
                .then((links) => {
                  if (validate) {
                    return validateLinks(links)
                      .then((validatedLinks) => {
                        return validatedLinks.map((link) => ({
                          ...link,
                          ok: link.ok === 'ok' ? 'ok' : 'fail',
                        }));
                      });
                  } else {
                    return links;
                  }
                })
            );
          } else if (fs.statSync(filePath).isDirectory()) {
            exploreDirectory(filePath); // Llamada recursiva para explorar subdirectorios
          }
        });
      };

      exploreDirectory(absolutePath); // Comienza la exploración desde el directorio raíz

      Promise.all(filePromises)
        .then((resultArrays) => {
          const allLinks = resultArrays.flat();
          resolve(allLinks);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      // Si el camino es un archivo, procesarlo directamente
      readFileContent(absolutePath)
        .then((fileContent) => extractLinks(fileContent, absolutePath))
        .then((links) => {
          if (validate) {
            return validateLinks(links)
              .then((validatedLinks) => {
                resolve(validatedLinks);
              });
          } else {
            resolve(links);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};


module.exports = { mdLinks };
