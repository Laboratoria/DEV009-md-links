const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Comprobar que la ruta existe
const pathExists = (filePath) => {
  return fs.existsSync(filePath);
};

// Asegurar que el archivo es markdown
const isMarkdownFile = (filePath) => {
  const extname = path.extname(filePath).toLowerCase();
  return extname === '.md';
};

// Leer el archivo
const readMarkdownFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Encuentra los links dentro del documento
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
  return axios.head(link.href)
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
          const linkPromise = readMarkdownFile(itemPath) // Lee el contenido del archivo
            .then((data) => {
              const links = findLinksInMarkdown(data); // Encuentra los enlaces en el contenido
              if (validate) {
                // Si se desea validar, realiza la validación de cada enlace
                return Promise.all(links.map((link) => validateLink(link)));
              }
              return links;
            });
          linksPromises.push(linkPromise);
        } else if (stats.isDirectory()) {
          // Si es un directorio, procesa sus archivos recursivamente
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
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  pathExists,
  isMarkdownFile,
  readMarkdownFile,
  findLinksInMarkdown,
  validateLink,
  processDirectory,
};
