const existsSync = require('./data');
const convertToAbsolutePath = require('./data');

//Crear la funcion mdLinks
const mdLinks = (pathReceived) => {
return new Promise (function(resolve,reject){
  
  if(existsSync(pathReceived)){
    resolve (convertToAbsolutePath(pathReceived));

  }else{
    reject('La ruta no existe');
  }

});
}

module.exports = mdLinks;