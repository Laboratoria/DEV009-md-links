const path = require('path');
const fs = require('fs');
const { promiseHooks } = require('v8');
const axios = require('axios');


// funcion para encontrar solo archivos Markdown
function searchMdFiles(filePath) {
  const extension = path.extname(filePath);
  // Lista de extensiones Markdown permitidas
  const mdExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
  //console.log(mdExtensions.includes(extension));
  return mdExtensions.includes(extension);
}

// función para leer archivo
function readdingFile(filePath) {
  return new Promise((resolve, reject) => {

    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) {
        reject('Ocurrió un error al leer el archivo:', error);
      } else {
        resolve(data);
      }
    });
  })
}

//función que busca links en archivo y encuentra href, text y file
function searchLinks(data, filePath) {
  const regExp = RegExp(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g); //guarda url del link
  const links = [];
  if (regExp.test(data)) {
    const foundLinks = data.match(regExp)
    //console.log(foundLinks, 'foundlinks');
    foundLinks.forEach(link => {
      const linkParts = link.slice(1, -1).split('](');
      const text = linkParts[0]; // texto descriptivo dentro de []
      const href = linkParts[1]; // URL dentro de ()

      //console.log(link);
      links.push({
        text: text,
        href: href,
        file: filePath,
      })
    });
  } else {
    console.log('no hay links en este archivo');
  }

  return links;
}

const validateUrl = (links) => {
  const urlStatus = links.map(link => {
    return axios.get(link.href)
    .then((response) =>{
      return {
        text: link.text,
        href: link.href,
        file: link.file,
        status: response.status,
        statusText: 'ok',
      }
    })
    .catch((error) => {
      return {
        text: link.text,
        href: link.href,
        file: link.file,
        status: error.response.status,  
        statusText: 'fail', 
      }
    })
  })
    
return Promise.all(urlStatus)
  

}


module.exports = {
  searchMdFiles,
  readdingFile,
  searchLinks,
  validateUrl }