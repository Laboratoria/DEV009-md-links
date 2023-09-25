const {
    pathExists,
    isMarkdownFile,
    readMarkdownFile,
    findLinksInMarkdown,
  } = require('../mdLink.js'); 
  
  describe('functions', () => {
    // Prueba para la función pathExists
    test('pathExists deberia retornar file existente', () => {
      const filePath = './miPrueba.md';
      const exists = pathExists(filePath);
      expect(exists).toBe(true);
    });
  
    // Prueba para la función isMarkdownFile
    test('isMarkdownFile deberia  retornar true para .md', () => {
      const filePath = 'miPrueba.md'; 
      const isMarkdown = isMarkdownFile(filePath);
      expect(isMarkdown).toBe(true);
    });
  
    // Prueba para la función readMarkdownFile
    test('readMarkdownFile deberia leer y retornar', () => {
      const filePath = './miPrueba.md'; 
      return readMarkdownFile(filePath).then((content) => {
        // Verifica que el contenido leído no esté vacío
        expect(content).toBeTruthy();
      });
    });
  
    // aqui probamos para la función findLinksInMarkdown
    test('findLinksInMarkdown deberia retornar array de los links', () => {
      const markdownContent = 'Contenido con [enlace](https://example.com)';
      const links = findLinksInMarkdown(markdownContent);
      expect(Array.isArray(links)).toBe(true);
      // Verificamos que el arreglo contenga un objeto de enlace con las propiedades href y text
      expect(links[0]).toHaveProperty('href');
      expect(links[0]).toHaveProperty('text');
    });
  
    
  });
  