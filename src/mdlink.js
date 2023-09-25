const { pathResult, isAbsolute, fileMd, readingContent, extractingLinks, pathIsValid, linksOn_Off, readDir, } = require('../src/data.js');
let mdFiles = 'textoPrueba.md';

function mdLinks (mdFiles, validate){
  return new Promise ((resolve, reject) => {

    if(!isAbsolute(mdFiles)){
      mdFiles = pathResult(mdFiles);
    }
    if (pathIsValid(mdFiles)){
      if(fileMd(mdFiles)){
       readingContent(mdFiles).then((content)=>{
       extractingLinks(mdFiles, content).then(links => {
       if(validate){
        resolve(linksOn_Off(links));
       } else{
        resolve(links);
        } 
       })
      })
      } else {
        reject('Error: el archivo no es markdown');
      }
    } else {
      reject('Error: la ruta no existe');
    }

mdLinks(mdFiles)
.then(result => {
  console.log(result);
})
.catch(error =>{
  console.log(error)
});

module.exports = { mdLinks };