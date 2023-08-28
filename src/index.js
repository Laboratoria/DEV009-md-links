const fs = require("fs");
const path = require("path");

function isMarkdownFile(filePath) {
  return path.extname(filePath).toLowerCase() === ".md";
}

function readingFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      resolve(data);
    });
  });
}

function mdLinks(filePath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(filePath);
    if (!isMarkdownFile(absolutePath)) {
      reject(new Error("El archivo no es de tipo Markdown"));
    } else {
      //si es un archivo markdown lee el archivo
      readingFile(absolutePath).then((data) => resolve(data));

      // extraer los links que contenga el archivo
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
  .then((links) => {
    // => [{ href, text, file }, ...]
    // console.log(links);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = mdLinks;
