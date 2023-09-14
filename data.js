const fs = require('fs');
const path = require('path');


function convertToAbsolutePath(pathReceived){
    return new Promise ( function(resolve,reject){
 
        if (fs.existsSync(pathReceived)){
            resolve (path.resolve(pathReceived));
        }
        reject('No existe la ruta');
    })
}

function readExtFile(pathReceived){
    const validExt = [
        '.md', '.mkd', '.mdwn', '.mdown',
        '.mdtxt', '.mdtext', '.markdown', '.text'
    ]
    const fileName = path.basename(pathReceived);
 return new Promise((resolve,reject) =>{
    if (validExt.includes(path.extname(fileName))){
        resolve();
    }else reject ('El archivo no es md');
 })
    
}

function readMarkdownFile (pathFile){
   fs.readFile(pathFile,'utf8',(err,data)=>{
        if(err) throw err;
        console.log(data);
    })
}



module.exports = { convertToAbsolutePath, readExtFile, readMarkdownFile }