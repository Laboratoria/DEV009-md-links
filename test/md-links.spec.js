const { mdLinks } = require('../mdlinks');

describe('mdLinks', () => {
  describe('File Exist Check', () => {
    test('Should reject the promise if the path does not exist', () => {
      expect.assertions(1);

      const nonExistentPath = '/ruta/no/existe.md';

      return mdLinks(nonExistentPath).catch((error) => {
        expect(error.message).toBe('La ruta no existe.');
      });
    });
  });

  describe('Markdown File Check', () => {
    test('Should throw an error if the file is not a markdown file', () => {
      expect.assertions(1);

      const nonmdfile = './thumb.png';
      return mdLinks(nonmdfile).catch((error) => {
        expect(error.message).toBe('No es un archivo Markdown.');
      });
    });

    
  });


});


