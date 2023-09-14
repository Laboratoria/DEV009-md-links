
const {convertToAbsolutePath, readExtFile, readMarkdownFile }= require('./data');


//Crear la funcion mdLinks
const mdLinks = (pathReceived) => {
return new Promise (function(resolve,reject){
 convertToAbsolutePath(pathReceived).then((absolutePath)=>{
  filePath = absolutePath;
  resolve (readExtFile(absolutePath).then(()=>{
    readMarkdownFile (filePath);
  }));
 }).catch((error) => reject(error));
});
}

module.exports = mdLinks;