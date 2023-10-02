const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Comprobar que la ruta existe
const pathExists = (filePath) => {
  return fs.existsSync(filePath);
};

// Asegurar que el archivo es Markdown
const isMarkdownFile = (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  return extname === '.md';
};

// Leer el archivo Markdown
const readMarkdownFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Error al leer el archivo: ${err.message}`);
      } else {
        resolve(data);
      }
    });
  });
};

// Encontrar los links dentro del documento Markdown
const findLinksInMarkdown = (markdownContent) => {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const links = [];
  let match;

  while ((match = linkRegex.exec(markdownContent)) !== null) {
    const text = match[1];
    const href = match[2];
    links.push({ href, text });
  }

  return links;
};

// Función para validar un enlace utilizando Axios
const validateLink = (link) => {
  // Verificar si link.href es un valor válido
  if (!link.href) {
    // Si link.href es null o undefined, devuelve un objeto de enlace con error
    return Promise.resolve({
      ...link,
      status: 'N/A',
      ok: false,
    });
  }

  return axios
    .head(link.href)
    .then((response) => {
      // Agrega las propiedades status y ok al objeto de enlace
      link.status = response.status;
      link.ok = response.statusText === 'OK';
      return link;
    })
    .catch((error) => {
      // En caso de error, agrega las propiedades status y ok al objeto de enlace con un mensaje de fallo
      link.status = error.response ? error.response.status : 'N/A';
      link.ok = false;
      return link;
    });
};

// Función para procesar un directorio y sus subdirectorios
const processDirectory = (directoryPath, validate) => {
  return new Promise((resolve, reject) => {
    try {
      const items = fs.readdirSync(directoryPath);
      const linksPromises = [];

      for (const item of items) {
        const itemPath = path.join(directoryPath, item);
        const stats = fs.statSync(itemPath);

        if (stats.isFile() && isMarkdownFile(itemPath)) {
          const linkPromise = readMarkdownFile(itemPath)
            .then((data) => {
              const links = findLinksInMarkdown(data);
              if (validate) {
                return Promise.all(links.map((link) => validateLink(link)));
              }
              return links;
            })
            .catch((error) => {
              reject(`Error al procesar el archivo ${itemPath}: ${error.message}`);
            });
          linksPromises.push(linkPromise);
        } else if (stats.isDirectory()) {
          const subdirectoryLinksPromise = processDirectory(itemPath, validate);
          linksPromises.push(subdirectoryLinksPromise);
        }
      }

      Promise.all(linksPromises)
        .then((linksArray) => {
          const links = linksArray.flat();
          resolve(links);
        })
        .catch((error) => {
          reject(`Error al procesar el directorio ${directoryPath}: ${error.message}`);
        });
    } catch (error) {
      reject(`Error al procesar el directorio ${directoryPath}: ${error.message}`);
    }
  });
};

// Listar archivos en un directorio
const listFilesInDirectory = (directoryPath) => {
  try {
    const files = fs.readdirSync(directoryPath);
    console.log('Archivos en el directorio:');
    files.forEach((file) => {
      console.log(file);
    });
  } catch (error) {
    console.error(`Error al listar archivos en el directorio: ${error.message}`);
  }
};

module.exports = {
  pathExists,
  isMarkdownFile,
  readMarkdownFile,
  findLinksInMarkdown,
  validateLink,
  processDirectory,
  listFilesInDirectory, 
};
