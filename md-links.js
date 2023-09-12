
const convertToAbsolutePath = require('./data');

//Crear la funcion mdLinks
const mdLinks = (pathReceived) => {
return new Promise (function(resolve,reject){
 convertToAbsolutePath(pathReceived).then((absolutePath)=>{
  resolve (absolutePath);
 }).catch((error) => reject(error));
});
}

module.exports = mdLinks;