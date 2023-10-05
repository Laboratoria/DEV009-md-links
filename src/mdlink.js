const {
  pathResult,
  isAbsolute,
  isDirectory,
  fileMd,
  readingContent,
  extractingLinks,
  pathIsValid,
  linksOn_Off,
  readDir,
} = require("./data.js");


function mdLinks(mdFiles, validate) {
  return new Promise((resolve, reject) => {
    if (!isAbsolute(mdFiles)) {
      mdFiles = pathResult(mdFiles);
    }
    if (pathIsValid(mdFiles)) {
      if (isDirectory(mdFiles)) {
       const Directorio = readDir(mdFiles)
        console.log(Directorio);
      } else {

        if (fileMd(mdFiles)) {
          readingContent((mdFiles)).then((content) => {
            extractingLinks(mdFiles, content).then(links => {
              if (validate) {
                linksOn_Off(links).then(
                  (links) => resolve(links)
                );
              } else {
                resolve(links);
              }
            })
              .catch(error => {
                reject(error)
              })
          })
        } else {
          reject("Error: el archivo no es markdown");
        }
      }
    } else {
      reject("Error: la ruta no existe");
    }
  });
}
module.exports = { mdLinks };