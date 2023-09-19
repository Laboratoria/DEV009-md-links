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
      })
      .catch((error) => {
        reject(new Error(`${error.message}`));
      });
  });
};

module.exports = { mdLinks };
