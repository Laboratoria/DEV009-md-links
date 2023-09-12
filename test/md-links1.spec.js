const { mdLinks } = require('../mdlinks');

describe('mdLinks Function - Promise.all', () => {
    it('Should resolve with an array of links when all filePromises resolve', () => {
      // Simula que pathExists e isDirectory resuelven correctamente
      jest.mock('../data.js', () => ({
        pathExists: jest.fn().mockResolvedValue(),
        isDirectory: jest.fn().mockResolvedValue(),
        // Resto de simulaciones aquí...
      }));
  
      // Resto de simulaciones aquí...
  
      const directoryPath = './data_testing/validDirectory';
  
      return mdLinks(directoryPath, false).then((result) => {
        // Verifica aquí el resultado esperado cuando todas las promesas se resuelven
        expect(Array.isArray(result)).toBe(true);
        // O verifica que contiene los objetos de enlace esperados
        expect(result).toEqual([
          { href: 'mocked-link', text: 'Mocked Link', file: 'file1.md' },
          { href: 'mocked-link', text: 'Mocked Link', file: 'file1.md' },
        ]);
      });
    });
  
    it('Should reject with an error when any filePromise rejects', () => {
      // Simula que pathExists e isDirectory resuelven correctamente
      jest.mock('../data.js', () => ({
        pathExists: jest.fn().mockResolvedValue(),
        isDirectory: jest.fn().mockResolvedValue(),
        // Resto de simulaciones aquí...
      }));
  
      // Simula un error en una de las promesas de filePromises
      const mockError = new Error('The path does not exist.');
      const mockFilePromises = [
        Promise.resolve([{ href: 'https://example.com', text: 'Link 1', file: 'file1.md' }]),
        Promise.reject(mockError), // Simulamos un error en una de las promesas
      ];
  
      // Resto de simulaciones aquí...
  
      const directoryPath = './data_testing/validDirectory';
  
      return mdLinks(directoryPath, false).catch((error) => {
        // Verifica aquí el error esperado cuando una de las promesas se rechaza
        expect(error).toBe(mockError);
      });
    });
  });
  