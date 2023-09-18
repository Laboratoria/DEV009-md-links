const {mdLinks} = require('../index.js');

const pathDontExist = ('/rutanoexistente.md');
const pathFile = ('test-folder/readmeTest.md');
const directoryPath = ('test');
const invalidFile = ('thumb.png')


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

  it('Deberia rechazar cuando no existe path', () => {
    return mdLinks(pathDontExist).catch((error) => {
      expect(error).toBe('La ruta no existe');

    })
  });

  it('Debería indicar si es un archivo Markdownn válido', () => {
    return mdLinks(pathFile).then((resolve)=> {
      expect(resolve).toBe('Es un archivo markdown válido');
    })
  });

  it('Debería indicar que la ruta es un directorio', () => {
    return mdLinks(directoryPath).then((resolve) => {
      expect(resolve).toBe('La ruta es un directorio');
    })
  });

  it('Debería indicar que la ruta es no es un archivo markdown', () => {
    return mdLinks(invalidFile).catch((reject) => {
      expect(reject).toBe('La ruta no es un archivo markdown');
    })
  });




});
