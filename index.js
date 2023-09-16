const fs = require('fs');
const path = require('path');
const { extractLinks, isMarkdownFile, readFileContent, validateLinks, pathExists, isDirectory } = require('./data.js');

const mdLinks = (directoryPath, validate) => {
  const absolutePath = path.resolve(directoryPath);

  return new Promise((resolve, reject) => {
    pathExists(absolutePath)
      .then(() => isDirectory(absolutePath))
      .then(() => {
        const filePromises = [];

        const files = fs.readdirSync(absolutePath);

        files.forEach((file) => {
          const filePath = path.join(absolutePath, file);

          if (isMarkdownFile(filePath)) {
            filePromises.push(
              readFileContent(filePath)
                .then((fileContent) => extractLinks(fileContent, filePath))
                .then((links) => {
                  if (validate) {
                    return validateLinks(links)
                      .then((validatedLinks) => {
                        // Actualizar la propiedad "ok" en función de la validación
                        return validatedLinks.map((link) => ({
                          ...link,
                          ok: link.ok === 'ok' ? 'ok' : 'fail',
                        }));
                      });
                  } else {
                    // Si no se requiere validación, mantener la propiedad "ok" como está
                    return links;
                  }
                })
            );
          }
        });

        Promise.all(filePromises)
          .then((resultArrays) => {
            const allLinks = resultArrays.flat();
            resolve(allLinks);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};


module.exports = { mdLinks };
