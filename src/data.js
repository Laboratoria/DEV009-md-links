// Funciones Puras

const fs = require('node:fs'); //file system
const path = require('node:path');
const { readFile } = require('node:fs');
const MarkdownIt = require('markdown-it');
const axios = require('axios');


// Comprueba que la ruta sea absoluta
const isAbsolute = (pathFile)=>{
  return path.isAbsolute(pathFile);
}
// Retorna la ruta
const pathResult = (pathFile)=>{
  return path.resolve(pathFile);
}
// valida si la ruta existe
const pathIsValid = (pathFile) => {
   return fs.existsSync(pathFile) 
  }

const isDirectory = (pathFile) =>{
  const stats = fs.statSync(pathFile);
  return stats.isDirectory(pathFile);
}
// es .md
const fileMd = (pathFile)=>{
  const extname = path.extname(pathFile);
  return extname === '.md';
}
const readingContent = (pathFile) => {
  return new Promise ((resolve, reject) =>{
      readFile(pathFile, 'utf8', (err, data) => {
          if (err) reject (err);
          resolve(data);
        });
  });
}

const extractingLinks = (pathFile, readingContent) => {
  const md = new MarkdownIt;
  const tokens = md.parse(readingContent, {});
  const links = [];
  let isFindit = false;
  tokens.forEach((token) => {
      if(token.type === 'inline'){
          const inlineTokens = token.children;
          inlineTokens.forEach((inlineToken) => {
              if(inlineToken.type === 'link_open'){
                isFindit = true;
                  links.push({
                      href: inlineToken.attrGet('href'),
                      text: '',
                      file: pathFile || pathResult(pathFile),
                  });
              } else if (isFindit && inlineToken.type === 'text'){
                  const lastLink = links[links.length -1];
                  lastLink.text += inlineToken.content;
              } else if(isFindit && inlineToken.type === 'link_close'){
                  isFindit = false;
              }

          });
      }
  });
if (links.length === 0){
  return Promise.reject('No se encontraron links en este archivo');
} else{
  return Promise.resolve(links);
}
}
const linksOn_Off = (links)=> {
  const myLinks = links.map(link => {
    return axios.get(link.href)
    .then((response)=>{
      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail',
      }
    })
    .catch(function(error){
      //console.log(error);
      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: error.response ? error.response.status : 500,
        ok: 'fail',
      }
  })
  })
  return Promise.all(myLinks);
}

const linksStst = (links) => {
  const oneLinks = [];
  for(let i =0; i < links.length; i++){
  if(!oneLinks.includes(links[i].href)){
      oneLinks.push(links[i].href);
  } 
  }  
  return {
      total: links.length, 
      unique: oneLinks.length
  }  
}

const stats_Validate = (all_Links) => {
  const countOne = [];
  const countBroken = [];
  for(let i =0; i < all_Links.length; i++){
      if(!countOne.includes(all_Links[i].href)){
          countOne.push(all_Links[i].href);
      }if(all_Links[i].ok !== 'ok'){
          countBroken.push(all_Links[i].ok);
      }
  }
  return {
      total: all_Links.length,
      unique: countOne.length,
      broken: countBroken.length
  }
}

const arrayOfDirectories = [];
const readDir = (dir) => { 
    const readingDirectory = fs.readdirSync(dir);

    readingDirectory.forEach((fileBasename) => {
        const filePath = path.join(dir, fileBasename);
        if (fileMd(filePath)){
            arrayOfDirectories.push(filePath);
        } else if (isDirectory(filePath)){
            readDir(filePath);
        }
    }); 
    // el arreglo vacío filtra archivos y si son markdown los pushea y si es un directorio debería ingresar a la función readDir otra vez
    return arrayOfDirectories;
  }
// const readDir = (dir) =>{
//   const files = fs.readdirSync(dir);
//   const filePaths = files.map(file => path.join(dir, file));
//   return filePaths.filter(pathFileBasename => fileMd(pathFileBasename));
// }

const forDirectory = (arrayOfDirectories) => {
  return new Promise((resolve) => {
      const files = readDir(arrayOfDirectories); // se llama al arreglo vacío
      const arrayOfFiles = [];
      const count = files.length-1;
      let index = 0;

      const iterator = pathFile => {
          readingContent(pathFile).then((content) => {
              extractingLinks(pathFile, content)
              .then(links => { 
                  arrayOfFiles.push(links);
              }).finally( () => {
                  index++;
                  if(index <= count){
                      iterator(files[index]);
                  } else {
                      resolve(arrayOfFiles.flat());
                  }
              })

            });
      }
      iterator(files[index]);
  })
}
  module.exports = { 
    pathResult,
    isAbsolute,
    isDirectory,
    fileMd,
    pathIsValid,
    extractingLinks,
    readingContent,
    linksOn_Off,
    linksStst,
    stats_Validate,
    readDir,
    forDirectory,
};

