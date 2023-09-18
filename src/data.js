// // Funciones Puras

// const fs = require('fs'); //file system
// const path = require('path');
// const mdLink = require('md-link');
// md = new mdLink()
// const fetch = require('node-fetch');

// // Retorna la ruta
// const pathResult = (pathReceived)=>{
//   return path.resolve(pathReceived);
// }

// // Comprueba que la ruta sea absoluta
// const pathAbs = (pathReceived)=>{
//   return path.isAbsolute(pathReceived);
// }

// // Convierte md en html
// const renderMdtoHTML = (content) =>{
//   const render = md.render(content);
//   return render;
// }

// // es .md
// const fileMd = (pathReceived)=>{
//   const md = path.extname(pathReceived);
//   return md === '.md';
// }

// // valida si la ruta existe
// const pathIsValid = (pathReceived) => {
//   try {
//     if (fs.existsSync(pathReceived)) {
//       return true;
//     }
//   } catch (error) {
//     return false;
//   }
// }

//   module.exports = { 
//     pathResult, pathAbs, renderMdtoHTML, fileMd, pathIsValid
// };

