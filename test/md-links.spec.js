const mdLinks = require('../index.js')

describe('mdLinks', () => {
  it('debería rechazar con un error si el argumento path no es una cadena', () => {
    return mdLinks(123) // Pasamos un número en lugar de una cadena
      .catch(error => { //captura el error rechazado
        expect(error.message).toBe('El archivo no es de tipo Markdown'); // Verificamos el mensaje del error
      });
  });
});


/*describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});*/
