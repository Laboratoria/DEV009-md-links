// Funciones Puras

const fs = require('node:fs'); //file system
const path = require('node:path');
const { readFile } = require('node:fs');
const MarkdownIt = require('markdown-it');

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

// es .md
const fileMd = (pathFile)=>{
  const extname = path.extname(pathFile);
  return extname === '.md';
}
const readingContent = (pathFile) => {
  return new Promise ((resolve, reject) =>{
      readFile(pathFile, 'utf8', (err, data) => {
          if (err) throw err;
          resolve(data);
        });
  });
}

const extractingLinks = (pathFile, readingContent) => {
  const md = new MarkdownIt;
  const tokens = md.parse(readingContent, {});
  const links = [];
  let isInside = false;
  tokens.forEach((token) => {
      if(token.type === 'inline'){
          const inlineTokens = token.children;
          inlineTokens.forEach((inlineToken) => {
              if(inlineToken.type === 'link_open'){
                  isInside = true;
                  links.push({
                      href: inlineToken.attrGet('href'),
                      text: '',
                      file: pathFile || pathResult(pathFile),
                  });
              } else if (isInside && inlineToken.type === 'text'){
                  const lastLink = links[links.length -1];
                  lastLink.text += inlineToken.content;
              } else if(isInside && inlineToken.type === 'link_close'){
                  isInside = false;
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

// // Convierte md en html
// const renderMdtoHTML = (content) =>{
//   const render = md.render(content);
//   return render;
// }

  module.exports = { 
    pathResult,
    isAbsolute,
    fileMd,
    pathIsValid,
    extractingLinks,
    readingContent,
};

