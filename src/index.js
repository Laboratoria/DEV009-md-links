const fs = require("fs");
const path = require("path");
const marked = require('marked');

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
        readingFile(absolutePath).then((data) => {
          const links = [];
          const tokens = marked.lexer(data);

          for (const token of tokens) {
            if (token.type === 'link') {
              links.push({
                href: token.href,
                text: token.text,
                file: absolutePath,
              });
            }
          }
          resolve(links);
        });
      }
    }
  });
}  

const filePath = '../README.md';
mdLinks(filePath)
  .then((links) => {
    // => [{ href, text, file }, ...]
    console.log('Enlaces encontrados:', links);
  })
  .catch((error) => {
    console.log('Error:', error.message);
  });

//console.log(path.join(__dirname, "./README.js"))

module.exports = mdLinks;
