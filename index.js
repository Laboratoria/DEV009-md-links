const fs = require("fs");
const path = require("path");
const md = require("markdown-it")(); // Importa y configura markdown-it
const { parse } = require("node-html-parser"); // Librería para parsear HTML
//const marked = require("marked");

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
        readingFile(absolutePath)
          .then((data) => {
            const htmlContent = md.render(data); // Convierte el Markdown a HTML
            const root = parse(htmlContent); // Parsea el HTML con node-html-parser
            const links = [];

            root.querySelectorAll("a").forEach((anchor) => {
              links.push({
                href: anchor.getAttribute("href"),
                text: anchor.text,
                file: absolutePath,
              });
            });
            resolve(links); // Resuelve la promesa con el array de enlaces
          })
          .catch((error) => {
            reject(error);
          });
      }
    }
  });
}


//const filePath = '../README.md';
mdLinks("./Guiaweb.md")
  .then((links) => {
    // => [{ href, text, file }, ...]
    console.log("Enlaces encontrados:", links);
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });

//console.log(path.join(__dirname, "./README.js"))

module.exports = mdLinks;
