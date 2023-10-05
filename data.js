const fs = require("fs"); // file system Este módulo proporciona funciones p/trabajar con el sistema de archivos, como leer y escribir archivos.
const { access, constants } = require("fs").promises; // metodo access se usa para verificar si un archivo o dir existe y
// constants contiene constantes que representan diferentes permisos y modos de acceso en el sistema de archivos.
const path = require("path"); // manipulacion y navegacion de rutas de archivos y directorios
const axios = require("axios");
const { fn } = require("jest-mock");
const { rejects } = require("assert");

// --------------------   verifica si un archivo existe --------------------  //
function fn_myFileExist(file) {
  return access(file, constants.F_OK)
    .then(() => true) // Resuelve a true si el archivo existe
    .catch(() => false);
}
// --------------------  determina si path es una ruta absoluta   --------------------  //
function fn_isAbsolute(file) {
  return path.isAbsolute(file);
}

// --------------------   convertir un archivo en ruta absoluta --------------------  //
function fn_convertAbsoluteFile(file) {
  return path.resolve(__dirname, file);
}

// --------------------   comprueba si un archivo es markdown --------------------  //
function fn_isMarkdownFile(file) {
  return path.extname(file);
}

// --------------------  obtener los links de un archivo  --------------------  //
function fn_getLinks(files) {
  const promises = files.map((fil) => {
    return new Promise((resolve, reject) => {
      const linkRegex = /\[([^\]]+)\]\(((?!#)(https[^\)]+))\)/g;
      const links = [];

      fs.readFile(fil, (err, data) => {
        if (err) {
          reject(err);
        } else {
          let match;
          while ((match = linkRegex.exec(data)) !== null) {
            links.push({
              href: match[2],
              text: match[1],
              file: fil,
            });
          }
          resolve(links);
        }
      });
    });
  });

  return Promise.all(promises)
    .then((results) => {
      const arrayLinks = [].concat(...results);
      //console.log(arrayLinks)
      return arrayLinks;
    })
}

// --------------------    validar los link  --------------------  //
function fn_validateUrl(links) {
  //declaramos la fn que recibe un arreglo de objetos
  const validateLinks = links.map((link) => {
    //utilizamos map para iterar sobre cada objeto en el arreglo "links" y crear un nuevo arreglo validateLinks

    return (
      axios
        // función axios.get devolverá una promesa que puedes manejar directamente en lugar de crear una nueva promesa.
        .get(link.href)
        .then((response) => {
          //si la peticion es exitosa
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
        })
    );
  });
  return Promise.all(validateLinks); // Devuelve una promesa que se resuelve cuando todas las promesas en el arreglo "validateLinks"
  // se han resuelto. Esto significa que obtendremos un arreglo de objetos "links" con información  adicional sobre el estado de cada enlace.
}
// --------------------     funcion fn_validarUrl   --------------------  //
// linksToValidate = [
//   { href: "https://www.google.com/dev009" },
//   { href: "https://www.google.com/" },
// ];

// fn_validateUrl(linksToValidate)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// --------------------    leer un directorio --------------------  //
// function fn_readDir(dir) {
//   return fs.promises.readdir(dir);
// }

// fn_readDir("./dirEjemplo")
//   .then((res) => {
//     console.log(res, "lista de archivos");
//   })
//   .catch((error) => {
//     console.log(error);
//   });



// --------------------    leer archivos de subdirectorio  y retorna solo aquellos que son markdown --------------------  //
const ext = [
  ".md",
  ".mkd",
  ".mdwn",
  ".mdown",
  ".mdtxt",
  ".mdtext",
  ".markdown",
  ".text",
];
const arrayOfFiles = [];

function readAllFiles(path) {
  return new Promise((resolve) => {
    const files = fs.readdirSync(path);
    files.forEach((file) => {
      const stat = fs.statSync(`${path}/${file}`);
      if (stat.isDirectory()) {
        readAllFiles(`${path}/${file}`);
      } else {
       if(ext.includes(fn_isMarkdownFile(`${path}/${file}`))){
        
        arrayOfFiles.push(`${path}/${file}`);
       }
      
      }
    });
    //console.log(arrayOfFiles)
  resolve (arrayOfFiles);
  });
}
//console.log(readAllFiles("./ejem-directorio"), " lista de sub");





module.exports = {
  fn_myFileExist,
  fn_isAbsolute,
  fn_convertAbsoluteFile,
  fn_isMarkdownFile,
  fn_getLinks,
  fn_validateUrl,
  //fn_readDir,
  readAllFiles,
};
