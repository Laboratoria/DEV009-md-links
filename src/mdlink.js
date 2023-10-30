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
  forDirectory,
} = require("./data.js");


function mdLinks(inputPath, validate) {
  return new Promise((resolve, reject) => {
    if (!isAbsolute(inputPath)) {
      inputPath = pathResult(inputPath);
    }
    if (pathIsValid(inputPath)) {
      if (isDirectory(inputPath)) {
        forDirectory(inputPath).then((links)=>{
          if (!validate){
            resolve(links);
          } else {
            linksOn_Off(links).then((res)=>{
              resolve(res);
            });
          }
        });
       
      } else {

        if (fileMd(inputPath)) {
          readingContent((inputPath)).then((content) => {
            extractingLinks(inputPath, content).then(links => {
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