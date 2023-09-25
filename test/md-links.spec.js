const { mdLinks } = require('../src/mdlink.js');


describe('mdLinks', () => {

  it('Debería rechazar la promesa si el archivo no es markdown', (done) => {
    const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/index.js';
    mdLinks(file).catch((response) => {
      expect(response).toBe('Error: el archivo no es markdown');
      done();
    })
  });
  it('Debería rechazar la promesa si la ruta no existe', (done) => {
    const file = 'Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/index.md';
    mdLinks(file).catch((response) => {
      expect(response).toBe('Error: la ruta no existe');
      done();
    })
  });
  it('Debería resolver un arreglo con tres objetos', (done) => {
    const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/textoPrueba.md';
    mdLinks(file).then((response) => {
      expect(response.length).toBe(3);
      done();
    })
  })

});