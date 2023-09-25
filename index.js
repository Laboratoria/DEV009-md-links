const path = require('path');
const { pathExists, isMarkdownFile, readMarkdownFile, findLinksInMarkdown, validateLink, processDirectory } = require('./mdLink.js'); // Importa la función processDirectory

const mdLink = (filePath, validate = false) => {
  return new Promise((resolve, reject) => {
    // Comprobar que la ruta existe
    if (!pathExists(filePath)) {
      reject('La ruta no existe');
      return;
    }

    // Asegurar que el archivo es Markdown
    if (!isMarkdownFile(filePath)) {
      reject('El archivo no es Markdown');
      return;
    }

    // Leer el archivo Markdown
    readMarkdownFile(filePath)
      .then((data) => {
        // Encontrar los links dentro del documento
        const links = findLinksInMarkdown(data);

        if (validate) {
          // Si se desea validar, realizar la validación de cada enlace
          const linkPromises = links.map((link) => validateLink(link));
          Promise.all(linkPromises)
            .then((validatedLinks) => {
              resolve(validatedLinks);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          // Si no se desea validar, vamos a resolver solo los enlaces encontrados
          resolve(links);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Función principal para procesar un directorio
const mdLinksDirectory = (directoryPath, validate = false) => {
  return processDirectory(directoryPath, validate);
};

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Debe proporcionar una ruta de archivo o directorio.');
} else if (args.length === 1) {
  // Llama a mdLink para un archivo individual
  const filePath = path.resolve(args[0]);
  mdLink(filePath, true) // Cambia true a false si no deseas validación
    .then((links) => {
      console.log('Enlaces encontrados con validación:');
      links.forEach((link) => {
        console.log(`href: ${link.href}`);
        console.log(`text: ${link.text}`);
        console.log(`file: ${filePath}`);
        console.log(`status: ${link.status}`);
        console.log(`ok: ${link.ok}`);
        console.log();
      });
    })
    .catch((error) => {
      console.error(error);
    });
} else if (args.length === 2 && args[0] === '--validate') {
  // Llama a mdLinksDirectory para un directorio con validación
  const directoryPath = path.resolve(args[1]);
  mdLinksDirectory(directoryPath, true) // Cambia true a false si no deseas validación
    .then((links) => {
      console.log('Enlaces encontrados con validación en el directorio:');
      links.forEach((link) => {
        console.log(`href: ${link.href}`);
        console.log(`text: ${link.text}`);
        console.log(`file: ${link.file}`);
        console.log(`status: ${link.status}`);
        console.log(`ok: ${link.ok}`);
        console.log();
      });
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.error('Comando no reconocido.');
}

