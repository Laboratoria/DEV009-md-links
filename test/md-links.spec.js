const { mdLink } = require('../index.js'); 
describe('mdLink function', () => {
  // Prueba básica para verificar si mdLink retorna un arreglo de objetos
  test('deberia retornar array de los objetos', async () => {
    const links = await mdLink('C:/Users/Laboratoria/Desktop/mdlinks/DEV009-md-links/miPrueba.md');
    
    expect(Array.isArray(links)).toBe(true);
    
    // Verifica que cada elemento en el arreglo sea un objeto con propiedades href, text y file
    links.forEach((link) => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
      expect(link).toHaveProperty('file');
    });
  });
});
