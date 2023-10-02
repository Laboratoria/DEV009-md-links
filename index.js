const path = require('path');
const {
  pathExists,
  isMarkdownFile,
  readMarkdownFile,
  findLinksInMarkdown,
  validateLink,
  processDirectory,
  listFilesInDirectory, 
} = require('./mdLink.js');

const defaultFileName = 'miPrueba.md';

const mdLink = (filePath, validate = false) => {
  return new Promise((resolve, reject) => {
    if (!pathExists(filePath)) {
      reject('La ruta no existe');
      return;
    }

    if (!isMarkdownFile(filePath)) {
      reject('El archivo no es Markdown');
      return;
    }

    readMarkdownFile(filePath)
      .then((data) => {
        const links = findLinksInMarkdown(data);

        if (validate) {
          const linkPromises = links.map((link) => validateLink(link));
          // console.log('Debug link:', link); // Agrega esta línea de registro
          // return validateLink(link);
      
          Promise.all(linkPromises)
            .then((validatedLinks) => {
              resolve(validatedLinks);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve(links);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const mdLinksDirectory = (directoryPath, validate = false) => {
  return processDirectory(directoryPath, validate);
};

const handleSingleFile = (filePath, validate) => {
  mdLink(filePath, validate)
    .then((links) => {
      console.log('Enlaces encontrados:');
      links.forEach((link) => {
        console.log(`href: ${link.href}`);
        console.log(`text: ${link.text}`);
        console.log(`file: ${filePath}`);
        if (validate) {
          console.log(`status: ${link.status}`);
          console.log(`ok: ${link.ok}`);
        }
        console.log();
      });
    })
    .catch((error) => {
      // console.error(error);
    });
};

const handleDirectory = (directoryPath, validate) => {
  if (validate) {
    listFilesInDirectory(directoryPath); // Lista los archivos en el directorio si se proporciona la opción --validate
  } else {
    mdLinksDirectory(directoryPath, validate)
      .then((links) => {
        console.log('Enlaces encontrados en el directorio:');
        links.forEach((link) => {
          console.log(`href: ${link.href}`);
          console.log(`text: ${link.text}`);
          console.log(`file: ${link.file}`);
          console.log();
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const args = process.argv.slice(2);

let filePath;

if (args.length === 0) {
  // console.error('Utilizando archivo predeterminado...');
  filePath = path.resolve(defaultFileName);
} else if (args.length === 1) {
  filePath = path.resolve(args[0]);
} else if (args.length === 2 && args[0] === '--validate') {
  const directoryPath = path.resolve(args[1]);
  handleDirectory(directoryPath, true); // Cambia `true` a `false` si no deseas validación
} else if (args.length === 2 && args[0] === '--list') {
  const directoryPath = path.resolve(args[1]);
  listFilesInDirectory(directoryPath); // Lista archivos en el directorio
} else {
  // console.error('Comando no reconocido.');
}

if (filePath) {
  handleSingleFile(filePath, true); // Cambia `true` a `false` si no deseas validación
}
module.exports = {
  mdLink,
};
