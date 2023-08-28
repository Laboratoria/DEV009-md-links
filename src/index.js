const fs = require("fs");
const path = require("path");

function isMarkdownFile(rutePath) {
  return path.extname(rutePath) === ".md";
}

function readingFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function mdLinks(rutePath, options) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(rutePath);
    if (!fs.existsSync(absolutePath)) {
      reject(new Error("La ruta no existe"));
    } else {
      if (!isMarkdownFile(absolutePath)) {
        reject(new Error("El archivo no es de tipo Markdown"));
      } else {
        // Si es un archivo markdown, lee el archivo
        readingFile(absolutePath).then((data) => resolve(data));
        // Extraer los links que contenga el archivo (Esta parte está comentada y parece que falta su implementación)
      }
    }
  });
}

/*return new Promise((resolve, reject) => {
    if (fs.existsSync(path)) {
    } else {
      reject("La ruta no existe");
    }
  });*/

//const mdLinks = require("md-links");

mdLinks("../README.md")
  .then((data) => {
    // => [{ href, text, file }, ...]
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

//console.log(path.join(__dirname, "./README.js"))

module.exports = mdLinks;
