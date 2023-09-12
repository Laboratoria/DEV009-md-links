const mdLinks = require('../');


describe('mdLinks', () => {
  it('should reject promise if path does not exist', () => {
    return mdLinks('./esta/ruta/noexiste.md').catch((error)=>{
      expect(error).toBe('La ruta no existe');
    })
  });
  it('debería resolver un arreglo con 3 links para un archivo .md con 3 links', () => {
    return mdLinks('miArchivo.md').then((result) => {
      expect();// fata terminar
    });
  });
});


