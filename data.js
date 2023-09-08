const path = require('path');
const fs = require ('fs');


// funcion para encontrar solo archivos Markdown
function searchMdFiles(filePath) {
    const extension = path.extname(filePath);
    // Lista de extensiones Markdown permitidas
    const mdExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    console.log(mdExtensions.includes(extension));
    return mdExtensions.includes(extension);
  }

// función para leer archivo
function readdingFile(filePath) {
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Ocurrió un error al leer el archivo:', error);
    } else {
      console.log('Contenido del archivo:', data);
    }
    });
  }

  //función que busca links en archivo y encuentra href, text y file
  function searchLinks(filePath, data){
    const regExp =  /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g; //guarda url del link
    const describeText = []; //texto descriptivo dentro de [] antes de url
    let foundLink;
    for(foundLink.matchAll(regExp)){
      
    }
  }



const filePath ='./README.md'
console.log(readdingFile(filePath));

module.exports = {
  searchMdFiles
}