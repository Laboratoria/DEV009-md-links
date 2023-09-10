const fs = require('./data');

//Crear la funcion mdLinks
const mdLinks = (path, options) => {
return new Promise (function(resolve,reject){
  // identificar si la ruta existe
  // convertir la ruta a absolutamdLinks(pat);
  if(fs.existsSync(path)){

  }else{
    reject('La ruta no existe');
  }

});
}

module.exports = mdLinks;