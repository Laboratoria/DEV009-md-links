
const {convertToAbsolutePath, readExtFile }= require('./data');


//Crear la funcion mdLinks
const mdLinks = (pathReceived) => {
return new Promise (function(resolve,reject){
 convertToAbsolutePath(pathReceived).then((absolutePath)=>{
  resolve (readExtFile(absolutePath).then((pathMarkdownFile)=>{
    return pathMarkdownFile;
  }));
 }).catch((error) => reject(error));
});
}

module.exports = mdLinks;