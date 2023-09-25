// aqui va mi funcion mdlinks()
const {
    fn_myFileExist,
    fn_isAbsolute,
    fn_convertAbsoluteFile,
    fn_isMarkdownFile,
    fn_getLinks,
    fn_validateUrl,
  } = require("./data.js");
  
  const pc = require("picocolors");
  const { link } = require("graceful-fs");
  
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
        console.log(exist);
        if (!exist) {
          reject("❌ no existe, ingresa una ruta correcta");
        }
        // si el archivo si exsite, entonces conviertelo a una ruta absoluta
        const nowAbsolute = fn_convertAbsoluteFile(file);
  
        // el archivo termina con alguna de estas extensiones array(extenciones)?
        if (extension.includes(fn_isMarkdownFile(file))) {
          fn_getLinks(file)
            .then((links) => {
              if (validate) {
                // si validate es true 
                fn_validateUrl(links) // llama a la funcion para verificar los enlaces obtenido
                
                  .then((validateLinks) => {
                    const result = {
                      exists: true,
                      isMarkdown: true,
                      file: nowAbsolute,
                      links: validateLinks,
                    };
                    resolve(result); // resuelve la promesa con el objeto result
                    console.log(result)
                  })
                  .catch((err) => {
                    reject(err);
                  });
              } else {
                // si validate es false
                const result = {
                  exists: true,
                  isMarkdown: true,
                  file: nowAbsolute,
                  links: links,
                };
                resolve(result);
              }
            })
            .catch((err) => {
              // cuando el archivo no es markdowm, se rechaza la promesa con error
              reject(err);
            });
        } else {
          reject("❌ No es un archivo markdown");
        }
      });
    });
  }
  
  module.exports = {
    mdLinks,
  };
  