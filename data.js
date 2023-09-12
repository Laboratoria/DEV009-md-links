const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const axios = require('axios');
let colors = require('colors');

const pathExists = (absolutePath) => {
  return new Promise((resolve, reject) => {
    fs.access(absolutePath, fs.constants.F_OK, (err) => {
      if (err) {
        reject(new Error('The path does not exist.'));
      } else {
        resolve(true);
      }
    });
  });
};

// ------------ Verificación de archivo Markdown -------------------
// Función que verifica si el archivo es markdown devolviendo un booleano
const isMarkdownFile = (file) => {
  return path.extname(file) === '.md';
}

// Función para verificar si el archivo es de tipo Markdown devolviendo una promesa
const verifyMarkdown = (file) => {
if (!isMarkdownFile(file)) {
  return Promise.reject(new Error('The file is not a Markdown (.md).'));
}
return Promise.resolve(file);
}

function readFileContent(absolutePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(absolutePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Can not read the file'));
        return;
      }
      resolve({ absolutePath, data });
    });
  });
}

const extractLinks = ({ absolutePath, data }) => {
  const md = new MarkdownIt();

  const tokens = md.parse(data, {});

  const links = [];

  let isInsideLink = false;

  tokens.forEach((token) => {
    if (token.type === 'inline') {
      const inlineTokens = token.children;
      inlineTokens.forEach((inlineToken) => {
        if (inlineToken.type === 'link_open') {
          isInsideLink = true;
          links.push({
            href: inlineToken.attrGet('href'),
            text: '',
            file: absolutePath,
          });
        } else if (isInsideLink && inlineToken.type === 'text') {
          const lastLink = links[links.length - 1];
          lastLink.text += inlineToken.content;
        } else if (isInsideLink && inlineToken.type === 'link_close') {
          isInsideLink = false;
        }
      });
    }
  });

  if (links.length === 0) {
    return Promise.reject(new Error('There are not links in the Markdown file.'));
  }

  return Promise.resolve(links);
};

const validateLinks = (links) => {
  const validatePromises = links.map((link) => {
    return validateUrl(link.href)
      .then((validateResult) => ({
        ...link,
        status: validateResult.status,
        ok: validateResult.ok==='ok' ? 'ok' : 'fail', 
      }))
      .catch((error) => ({
        ...link,
        status: 'fail',
        ok: 'fail',
      }));
  });

  return Promise.all(validatePromises);
};

const validateUrl = (url) => {
  return axios.get(url)
    .then(response => {
      return {
        status: response.status,
        ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail',
      };
    })
    .catch(error => {
      return {
        status: error.response ? error.response.status : 'No Response',
        ok: 'fail',
      };
    });
};

const directoryExists = (absolutePath) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(absolutePath)) {
      resolve(true);
    } else {
      reject(new Error('The path does not exist'));
    }
  });
};

const isDirectory = (absolutePath) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(absolutePath) && fs.lstatSync(absolutePath).isDirectory()) {
      resolve(true);
    } else {
      reject(new Error('The path is not a directory'));
    }
  });
};




module.exports = { pathExists, isMarkdownFile, verifyMarkdown, readFileContent, extractLinks, validateLinks, validateUrl, directoryExists, isDirectory };
