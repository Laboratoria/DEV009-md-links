const fs = require ('fs');
const path = require('node:path');
const { searchMdFiles } = require('./data.js');

function mdLinks (filePath, options) {
  return new Promise((resolve, reject) => {
    if(fs.existsSync(filePath)){ // archivo existe
      if(!path.isAbsolute(filePath)){ // chequea que no sea relativo
        filePath = path.resolve(filePath); //si es relativo, hay que transformarlo en absoluto con path.resolve()
      }
        console.log(filePath);
         if(searchMdFiles(filePath)){
          resolve('el archivo es md');
         }   else {
          reject('el archivo no es md');
         }            //comprobar si archivo es md

    } else {
      reject('La ruta no existe'); // rechazar la promesa"la ruta no existe"
    }
   
    
    // comprobar si la ruta existe
    
    // promesa debe retornar un objeto con:
    // href: URL encontrada.
    // text: Texto que aparecía dentro del link.
    // file: Ruta del archivo donde se encontró el link.
    
  })
}

mdLinks('./README.md')
.then((resolve)=>{
console.log(resolve);
})
.catch((reject)=>{
console.log(reject);
})
module.exports = () => {
  // ...
};
