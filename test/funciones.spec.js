const {
    pathExists,
    isMarkdownFile,
    readMarkdownFile,
    findLinksInMarkdown,
  } = require('../mdLink.js');
  
  const axios = require('axios');
  
  jest.mock('axios');
  axios.head.mockResolvedValue({ status: 200, statusText: 'OK' });
  
  describe('Functions in mdLink.js', () => {
    // Prueba para pathExists
    test('pathExists debería retornar false para archivo inexistente', () => {
      const filePath = './archivo_inexistente.md';
      const exists = pathExists(filePath);
      expect(exists).toBe(false);
    });
  
    // Prueba para isMarkdownFile
    test('isMarkdownFile debería retornar false para archivo sin extensión .md', () => {
      const filePath = 'archivo_sin_extension.txt';
      const isMarkdown = isMarkdownFile(filePath);
      expect(isMarkdown).toBe(false);
    });
  
    // Prueba para readMarkdownFile con archivo inexistente
    test('readMarkdownFile debería rechazar con un mensaje de error para archivo inexistente', async () => {
      const filePath = './archivo_inexistente.md';
      try {
        await readMarkdownFile(filePath);
      } catch (error) {
        expect(error).toMatch(/Error al leer el archivo/);
      }
    });

  
    // Prueba para findLinksInMarkdown con varios enlaces en el contenido
    test('findLinksInMarkdown debería retornar un array de objetos de enlace para contenido con varios enlaces', () => {
      const markdownContent = 'Contenido con [enlace1](https://example1.com) y [enlace2](https://example2.com)';
      const links = findLinksInMarkdown(markdownContent);
      expect(Array.isArray(links)).toBe(true);
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveProperty('href', 'https://example1.com');
      expect(links[1]).toHaveProperty('href', 'https://example2.com');
    });
    
    // Prueba para findLinksInMarkdown con contenido sin enlaces
    test('findLinksInMarkdown debería retornar un array vacío para contenido sin enlaces', () => {
      const markdownContent = 'Este es un documento sin enlaces.';
      const links = findLinksInMarkdown(markdownContent);
      expect(Array.isArray(links)).toBe(true);
      expect(links).toHaveLength(0);
    });
  });
  