const { pathResult, isAbsolute, fileMd, readingContent, extractingLinks, pathIsValid, } = require('../src/data');
let mdFiles = 'textoPruebaDos.md';

function mdLinks (mdFiles){
  return new Promise ((resolve, reject) => {

    if(!isAbsolute(mdFiles)){
      mdFiles = pathResult(mdFiles);
    }
    if (pathIsValid(mdFiles)){
      if(fileMd(mdFiles)){
       readingContent(mdFiles).then((content)=>{
       resolve(extractingLinks(mdFiles, content));
       })
      } else {
        reject('Error: el archivo no es markdown');
      }
    } else {
      reject('Error: la ruta no existe');
    }
  });
}
mdLinks(mdFiles)
.then(result => {
  console.log(result);
})
.catch(error =>{
  console.log(error)
});

module.exports = { mdLinks };