const fs = require('fs');
const path = require('path');

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

module.exports = {
  pathExists,
  isMarkdownFile,
  readMarkdownFile,
  findLinksInMarkdown,
};
