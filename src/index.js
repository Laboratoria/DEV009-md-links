const fs = require("fs");
const path = require("path");

function isMarkdownFile(rutePath) {
  return path.extname(rutePath) === ".md";
}

function readingFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (data) => {
      resolve(data);
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

mdLinks("./README.md")
  .then(() => {
    // => [{ href, text, file }, ...]
    // console.log(links);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = mdLinks;
