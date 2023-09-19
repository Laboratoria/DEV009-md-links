// aqui va mi funcion mdlinks()
const picocolors = require("picocolors");
const {
  fn_myFileExist,
  fn_isAbsolute,
  fn_convertAbsoluteFile,
  fn_isMarkdownFile,
  fn_getLinks,
} = require("./data.js");

const pc = require("picocolors");

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

function mdLinks(file) {
  return new Promise((resolve, reject) => {
    fn_myFileExist(file)
      .then((exist) => {
        console.log("Exist:", exist);
        if (!exist) {
          reject(pc.red`${file}`);
          return;
        }
        // si el archivo si exsite, entonces conviertelo a una ruta absoluta
        const nowAbsolute = fn_convertAbsoluteFile(file);
        console.log(pc.magenta(`▶️ ▶️ ${nowAbsolute}`));

        // el archivo termina con alguna de estas extensiones array(extenciones)?
        if (extension.includes(fn_isMarkdownFile(file))) {
          console.log(
            pc.green(
              ` ✅ El archivo existe, \n ✅ Es una ruta absoluta, \n ✅ Es ${fn_isMarkdownFile(
                file
              )}`
            )
          );
          fn_getLinks(file).then((res) => {
            console.log(res);
          });
        } else {
          console.log("No es archivo Markdown");
          return;
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  mdLinks,
};

mdLinks("prueba.md")
  .then((res) => {
    console.log("Promesa resuelta con éxito! " + res);
  })
  .catch((error) => {
    console.log(pc.red(error + "  ❌ no existe, ingresa una ruta correcta"));
  });
