const {
  pathResult,
  isAbsolute,
  fileMd,
  readingContent,
  extractingLinks,
  pathIsValid,
  linksOn_Off,
  readDir,
} = require("./data.js");
let mdFiles = './src/textoPrueba.md';
let validate = true;

function mdLinks(mdFiles, validate) {
  return new Promise ((resolve, reject) => {
    if (!isAbsolute(mdFiles)){
      mdFiles = pathResult(mdFiles);
      if (!mdFiles){
        reject("Error: la ruta no existe");
        return
      }
      console.log(mdFiles);
    }
      if(pathIsValid(mdFiles)){
        if(fileMd(mdFiles)){
          readingContent((mdFiles)).then((content) => {
          console.log ("then del readingContent");
          extractingLinks(mdFiles, content).then(links => {
            if(validate){
              linksOn_Off(links).then(
                (links) => resolve(links)
              );
            } else {
              resolve(links);
            }
          })
          })
        }
      } else {
        reject("Error: el archivo no es markdown");
        }
  });
}

mdLinks(mdFiles, validate)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = { mdLinks };