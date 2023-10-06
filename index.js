// aqui va mi funcion mdlinks()
const fs = require("fs");

const {
  fn_myFileExist,
  fn_isAbsolute,
  fn_convertAbsoluteFile,
  fn_isMarkdownFile,
  fn_getLinks,
  fn_validateUrl,
  //fn_readAllFiles,
  readAllFiles,
} = require("./data.js");

const pc = require("picocolors");
const path = require("path");

const extension = [
  ".md",
  ".mkd",
  ".mdwn",
  ".mdown",
  ".mdtxt",
  ".mdtext",
  ".markdown",
  ".text",
];

function mdLinks(file, validate) {
  return new Promise((resolve, reject) => {
    fn_myFileExist(file).then((exist) => {
      if (!exist) {
        reject("❌ no existe, ingresa una ruta correcta");
        return;
      }
      const nowAbsolute = fn_convertAbsoluteFile(file);

      if (fs.statSync(nowAbsolute).isDirectory()) {
        //console.log("es un directorio");
        //console.log(readAllFiles(nowAbsolute), "kkk")
        readAllFiles(nowAbsolute).then((arrayOfFiles) => {
          //console.log(arrayOfFiles, "todos los archivos");

          fn_getLinks(arrayOfFiles).then((links) => {
            if (validate) {
              // si validate es true
              fn_validateUrl(links) // llama a la funcion para verificar los enlaces obtenido
                .then((validateLinks) => {
                  resolve(validateLinks);
                })
                .catch((err) => {
                  reject(err);
                });
            } else {
              resolve(links);
            }
          });
        });
      } else {
        //console.log("es un archivo");

        // el archivo termina con alguna de estas extensiones array(extenciones)?
        if (extension.includes(fn_isMarkdownFile(file))) {
          fn_getLinks([file])
            .then((links) => {
              if (validate) {
                // si validate es true
                fn_validateUrl(links) // llama a la funcion para verificar los enlaces obtenido
                  .then((validateLinks) => {
                    resolve(validateLinks); // resuelve la promesa con el objeto result
                    //console.log(result)
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else {
                resolve(links);
              }
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        } else {
          reject("❌ No es un archivo markdown");
        }
      }
    });
  });
}

module.exports = {
  mdLinks,
};
