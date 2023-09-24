const fs = require('node:fs');
const path = require('node:path');
const { searchMdFiles, readdingFile, searchLinks, validateUrl } = require('./data.js');


function mdLinks(filePath, validate) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      if (!path.isAbsolute(filePath)) {
        filePath = path.resolve(filePath);
      }
      if (!searchMdFiles(filePath)) {
        reject('El archivo no es Markdown');
        return;
      }
      readdingFile(filePath)
        .then((fileData) => {
        
          const links = searchLinks(fileData,filePath);
          //console.log(links,'links');
          if (links.length > 0) {
           resolve (validateUrl(links))

           
          } else {
            reject('No hay links en el archivo');
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject('La ruta no existe');
    }
    
  }

  )}

    /* mdLinks('./docs/archivos.md')
     .then((resolve) => {
        console.log(resolve);
      })
      .catch((reject) => {
        console.log(reject);
      })*/

module.exports =  { 
      mdLinks
    };
