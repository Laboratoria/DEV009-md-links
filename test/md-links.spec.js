const { mdLink } = require('../index.js'); // Asegúrate de que la ruta sea correcta

describe('mdLink function', () => {
  // Prueba básica para verificar si mdLink retorna un arreglo de objetos
  test('should return an array of link objects', async () => {
    const links = await mdLink('C:/Users/Laboratoria/Desktop/mdlinks/DEV009-md-links/miPrueba.md');
    
    expect(Array.isArray(links)).toBe(true);
    
    // Verifica que cada elemento en el arreglo sea un objeto con propiedades href, text y file
    links.forEach((link) => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
      expect(link).toHaveProperty('file');
    });
  });

  // Agrega más pruebas según sea necesario para verificar el comportamiento esperado de mdLink.
});
