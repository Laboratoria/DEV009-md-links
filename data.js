const path= require('path');
const fs = require('fs');

const checkMarkdownFile = function(file){
    for (let i = 0; i < markdownExtensions.length; i++){
       if (path.extname(file) === markdownExtensions[i]){
            return true;
       } else{
            return false;
       }
    }
};

const markdownExtensions = [
    '.md',
    '.mkd',
    '.mdwn',
    '.mdown',
    '.mdtxt',
    '.mdtext',
    '.markdown',
    '.text',
]

const readFileMarkdown = function(file){
  return new Promise ((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err,data)=>{
      if (err){
        reject ('error',err);
      } else{
        const regularExpression = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
        const linkList = [];
        let match;
      
        while ((match = regularExpression.exec(data)) !== null) {
          const text = match[1];
          const href = match[2];
          const arrayObjects = {
            href: href,
            text: text,
            file: file,
          };
          linkList.push(arrayObjects);
        }
        //console.log(linkList);
        resolve(linkList); 
      }
    })

  })
    
}
  


module.exports = {checkMarkdownFile, readFileMarkdown}