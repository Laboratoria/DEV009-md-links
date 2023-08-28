const mdLinks = require('../src/index.js')

describe('mdLinks', () => {
  /*it('debería rechazar con un error si el argumento path no es una cadena', () => {
    return mdLinks(123) 
      .catch(error => { 
        expect(error.message).toBe('El archivo no es de tipo Markdown');
      });
  });*/
  it('debería rechazar con un error si el archivo no es tipo Markdown', () => {
    return mdLinks("./mdlinks.js") // Pasamos un archivo.js en vez de un archivo .md
      .catch(error => { //captura el error rechazado
        expect(error.message).toBe('El archivo no es de tipo Markdown'); 
      });
  });
  it('debe leer el archivo si es tipo Markdown', () => {
    return mdLinks("./README.md")       
     .then(data => {
      expect(data).toBeDefined();
    });
  });  
});


/*describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});*/
