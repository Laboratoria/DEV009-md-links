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
    return axios.getAdapter(link.href)
    .then(funtion(response),{
      return: {
        href: link.href,
        text: link.text,
        file: link.file,
        satus: response.status,
        ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail',
      }
    })
    .catch(function(error){
      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: error.response.status,
        ok: 'fail',
      }
  })
  })
  return Promise.all(myLinks);
}
const readDir = (dir) =>{
  const files = fs.readdirSync(dir);
  const filePaths = files.map(file => path.join(dir, file));
  return filePaths;
    // return readingDir.filter(pathFileBasename => fileMd(pathFileBasename)).map(pathFileBasename => path.join(pathFile, pathFileBasename).toString;
}
console.log(readDir('md'));




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
    linksOn_Off,
    readDir,
};

