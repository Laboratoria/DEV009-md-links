const {
    pathExists,
    isMarkdownFile,
    readMarkdownFile,
    findLinksInMarkdown,
  } = require('../mdLink.js'); 
  
  describe('Auxiliary functions', () => {
    // Prueba para la función pathExists
    test('pathExists should return true for an existing file', () => {
      const filePath = './miPrueba.md'; // Ruta correcta al archivo existente
      const exists = pathExists(filePath);
      expect(exists).toBe(true);
    });
  
    // Prueba para la función isMarkdownFile
    test('isMarkdownFile should return true for a .md file', () => {
      const filePath = 'miPrueba.md'; // Nombre de archivo .md válido
      const isMarkdown = isMarkdownFile(filePath);
      expect(isMarkdown).toBe(true);
    });
  
    // Prueba para la función readMarkdownFile
    test('readMarkdownFile should read and return file content', () => {
      const filePath = './miPrueba.md'; // Ruta correcta al archivo de prueba
      return readMarkdownFile(filePath).then((content) => {
        // Verifica que el contenido leído no esté vacío
        expect(content).toBeTruthy();
      });
    });
  
    // Prueba para la función findLinksInMarkdown
    test('findLinksInMarkdown should return an array of links', () => {
      const markdownContent = 'Contenido con [enlace](https://example.com)';
      const links = findLinksInMarkdown(markdownContent);
      expect(Array.isArray(links)).toBe(true);
      // Verifica que el arreglo contenga un objeto de enlace con las propiedades href y text
      expect(links[0]).toHaveProperty('href');
      expect(links[0]).toHaveProperty('text');
    });
  
    // Agrega más pruebas según sea necesario para verificar el comportamiento de las funciones auxiliares.
  });
  