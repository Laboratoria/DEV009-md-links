const {readFileMarkdown} = require('../data.js');

describe ('readFileMarkdown', () => {
    
    it('Debería enviar un mensaje de error si el arcivo no se puede leer', () => {
      return readFileMarkdown('pruba.md')
      .catch((err) => {
        expect(err).toBe('error');
      });
    });
    
    it('Debería enviar los links encontrados en el archivo markdown', () => {
      const file = 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md';
      return readFileMarkdown(file).then (linkList => {
        expect(linkList).toEqual([
         {
           href: 'https://www.npmjs.com/package/markdown-it',
           text: 'Markdown-it',
           file: 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md'
         },
         {
           href: 'https://github.com/markedjs/marked',
           text: 'marked',
           file: 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md'
         },
         {
           href: 'https://www.npmjs.com/package/jsdom',
           text: 'JSDOM',
           file: 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md'
         },
         {
           href: 'https://cheerio.js.org/',
           text: 'Cheerio',
           file: 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md'
         },
         {
           href: 'https://marked.js.org/using_pro#renderer',
           text: 'custom renderer de la librería marked',
           file: 'C:/Users/Brenda/Documents/GitHub/DEV009-md-links/test-folder/readmeTest.md'
         }
       ]);
      });
    });
});