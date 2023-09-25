const fs = require("fs"); // file system Este módulo proporciona funciones p/trabajar con el sistema de archivos, como leer y escribir archivos.
const { access, constants } = require("fs").promises; // metodo access se usa para verificar si un archivo o dir existe y
// constants contiene constantes que representan diferentes permisos y modos de acceso en el sistema de archivos.
const path = require("path"); // manipulacion y navegacion de rutas de archivos y directorios
const axios = require("axios");
const { error } = require("console");

// Check if the file exists in the current directory.
function fn_myFileExist(file) {
  return access(file, constants.F_OK)
    .then(() => true) // Resuelve a true si el archivo existe
    .catch(() => false);
}

function fn_isAbsolute(file) {
  return path.isAbsolute(file); //método determina si path es una ruta absoluta
}

function fn_convertAbsoluteFile(file) {
  return path.resolve(__dirname, file);
}

function fn_isMarkdownFile(file) {
  return path.extname(file);
}

function fn_getLinks(file) {
  return new Promise(function (resolve, reject) {
    const linkRegex = /\[([^\]]+)\]\(((?!#)(https[^\)]+))\)/g;
    const links = [];
    let match;

    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
      } else {
        while ((match = linkRegex.exec(data)) !== null) {
          links.push({
            href: match[2],
            text: match[1],
            file: file,
          });
        }
      }
      resolve(links);
    });
  });
}

function fn_validateUrl(links) {  //declaramos la fn que recibe un arreglo de objetos
  const validateLinks = links.map((link) => { //utilizamos map para iterar sobre cada objeto en el arreglo "links" y crear un nuevo arreglo validateLinks
    
    return axios
    // función axios.get devolverá una promesa que puedes manejar directamente en lugar de crear una nueva promesa.
        .get(link.href)
        .then((response) => { //si la peticion es exitosa
          link.status = response.status; // se le asigna el status
          link.ok =
            response.status >= 200 && response.status < 400 ? "ok" : "fail"; //verifica si el estado de la respuesta está entre 200 y 399. Si es así, devuelve "ok", de lo contrario, devuelve "fail". 
            // Esto se utiliza para determinar si la petición HTTP fue exitosa o no.
          return link;
        })
        .catch((error) => {
          link.status = error.response.status;
          link.ok = "fail";
          return link;
        });
    });
    //console.log(Promise.all(validateLinks))
  return Promise.all(validateLinks); // Devuelve una promesa que se resuelve cuando todas las promesas en el arreglo "validateLinks" 
  // se han resuelto. Esto significa que obtendremos un arreglo de objetos "links" con información  adicional sobre el estado de cada enlace.
  
}

module.exports = {
  fn_myFileExist,
  fn_isAbsolute,
  fn_convertAbsoluteFile,
  fn_isMarkdownFile,
  fn_getLinks,
  fn_validateUrl,
};
