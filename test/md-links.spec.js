const { mdLink } = require('../index.js');
const axios = require('axios');

jest.mock('axios');
axios.head.mockResolvedValue({ status: 200, statusText: 'OK' });

describe('mdLink function', () => {
  // verificar si mdLink retorna un arreglo de objetos
  test('debería retornar un array de objetos de enlace', async () => {
    const links = await mdLink('./miPrueba.md', true); //ruta válida
    
    expect(Array.isArray(links)).toBe(true);
    
    // Verifica que cada elemento en el arreglo tenga las propiedades href y text
    links.forEach((link) => {
      expect(link).toHaveProperty('href');
      expect(link).toHaveProperty('text');
    });
  });
  
  // Prueba para mdLink con archivo inexistente
  test('mdLink debería rechazar con un mensaje de error para archivo inexistente', async () => {
    const filePath = './archivo_inexistente.md';
    try {
      await mdLink(filePath);
    } catch (error) {
      expect(error).toMatch(/La ruta no existe/);
    }
  });

  
  
});
