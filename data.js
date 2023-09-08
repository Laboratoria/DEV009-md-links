const path = require('path');

// funcion para encontrar solo archivos Markdown
function searchMdFiles(filePath) {
    const extension = path.extname(filePath);
    // Lista de extensiones Markdown permitidas
    const mdExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
    console.log(mdExtensions.includes(extension));
    return mdExtensions.includes(extension);
  }

module.exports = {
  searchMdFiles
}