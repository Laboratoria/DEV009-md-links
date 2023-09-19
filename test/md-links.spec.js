const { mdLinks } = require('../index.js');

describe('mdLinks', () => {
  // Caso de prueba 1: Prueba básica sin validación
  test('should return an array of links with no validation', () => {
    return mdLinks('./directory', false).then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('href');
      expect(result[0]).toHaveProperty('text');
    });
  });

  // Caso de prueba 2: Prueba con validación
  test('should return an array of links with validation', () => {
    return mdLinks('./directory', true).then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('href');
      expect(result[0]).toHaveProperty('text');
      expect(result[0]).toHaveProperty('ok');
      expect(result[0]).toHaveProperty('status');
    });
  });

// Caso de prueba 3: Prueba cuando el directorio no existe
test('should reject with an error when directory does not exist', () => {
  return mdLinks('./non-existent-directory', true)
    .catch((error) => {
      expect(error.message).toBe("The path is not a valid directory or file.");
    });
});
});

//Caso de prueba 4:: Prueba básica sin validación de un file
  test('should return an array of links with no validation', () => {
    return mdLinks('./example.md', false).then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('href');
      expect(result[0]).toHaveProperty('text');
    });
  });

   // Caso de prueba 5: Prueba con validación
   test('should return an array of links with validation', () => {
    return mdLinks('./example.md', true).then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('href');
      expect(result[0]).toHaveProperty('text');
      expect(result[0]).toHaveProperty('ok');
      expect(result[0]).toHaveProperty('status');
    });
  });