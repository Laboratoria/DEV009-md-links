const fs = require("fs"); // file system Este módulo proporciona funciones p/trabajar con el sistema de archivos, como leer y escribir archivos.
const { access, constants } = require("fs").promises; // metodo access se usa para verificar si un archivo o dir existe y
// constants contiene constantes que representan diferentes permisos y modos de acceso en el sistema de archivos.
const path = require("path"); // manipulacion y navegacion de rutas de archivos y directorios

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
      console.log(links, "esto")
    });
  });
}

module.exports = {
  fn_myFileExist,
  fn_isAbsolute,
  fn_convertAbsoluteFile,
  fn_isMarkdownFile,
  fn_getLinks,
};
