const { mdLinks } = require('../src/mdlink.js');


describe('mdLinks', () => {

  it('Debería rechazar la promesa si el archivo no es markdown', (done) => {
    const file = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/index.js';
    mdLinks(file).catch((response) => {
      expect(response).toBe('Error: el archivo no es markdown');
      done();
    })
  });
  it('Debería rechazar la promesa si la ruta no existe', (done) => {
    const file = './Noexiste';
    mdLinks(file).catch((response) => {
      expect(response).toBe('Error: la ruta no existe');
      done();
    })
  });
  it('Debería resolver un arreglo con tres objetos', (done) => {
    const file = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md';
    mdLinks(file).then((response) => {
      expect(response.length).toBe(3);
      done();
    })
  })
  it("Debería resolver con links cuando validate es false", () => {
    const inputPath = "/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md";
    const validate = false;
    return mdLinks(inputPath, validate)
      .then((result) => {
        // Realiza las aserciones correspondientes
        expect(Array.isArray(result)).toBe(true); // Verifica que el resultado sea un arreglo de links
        // Agrega más aserciones según tus necesidades
      })
      .catch((error) => {
        // Maneja los errores si la promesa es rechazada
        throw error; // Lanza el error para que Jest lo maneje
      });
  });

  it("Debería resolver con links cuando validate es true", () => {
    const inputPath = "/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md";
    const validate = true;
    return mdLinks(inputPath, validate)
      .then((result) => {
        // Realiza las aserciones correspondientes
        expect(Array.isArray(result)).toBe(true); // Verifica que el resultado sea un arreglo de links
        // Verifica que cada link tenga las propiedades adecuadas, por ejemplo, href, text, file, status y ok
        result.forEach((link) => {
          expect(link).toHaveProperty("href");
          expect(link).toHaveProperty("text");
          expect(link).toHaveProperty("file");
          expect(link).toHaveProperty("status");
          expect(link).toHaveProperty("ok");
        });
      })
      .catch((error) => {
        // Maneja los errores si la promesa es rechazada
        throw error; // Lanza el error para que Jest lo maneje
      });
  });

  it("Debería rechazar con un mensaje error cuando la ruta es invalida", () => {
    const inputPath = "/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.js";
    const validate = false;
    return mdLinks(inputPath, validate)
      .then(() => {
        // Si la promesa no se rechaza, la prueba debe fallar
        expect(true).toBe(false);
      })
      .catch((error) => {
        // Verifica que el error sea el esperado
        expect(error).toMatch("Error: la ruta no existe");
      });
  });

  it('Dereía resolver con links cuando la ruta es un directorio y validate es false', (done) => {
    const inputPath = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md';
    const validate = false;
    mdLinks(inputPath, validate)
      .then((result) => {
        // Realiza las aserciones correspondientes
        expect(Array.isArray(result)).toBe(true); // Verifica que el resultado sea un arreglo de links
        // Agrega más aserciones según tus necesidades
        done(); // Indica que la prueba ha finalizado
      })
      .catch((error) => {
        // Maneja los errores si la promesa es rechazada
        done.fail(error); // Indica que la prueba ha fallado y muestra el error
      });
  });

  it('Debería resolver con links válidos cuando la ruta es un directorio y validate es true', (done) => {
    const inputPath = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md';
    const validate = true;
    mdLinks(inputPath, validate)
      .then((result) => {
        expect(Array.isArray(result)).toBe(true); // Verifica que el resultado sea un arreglo de links
        // Verifica que cada link tenga las propiedades adecuadas, por ejemplo, href, text, file, status y ok
        result.forEach((link) => {
          expect(link).toHaveProperty('href');
          expect(link).toHaveProperty('text');
          expect(link).toHaveProperty('file');
          expect(link).toHaveProperty('status');
          expect(link).toHaveProperty('ok');
        });
        
        done(); // Indica que la prueba ha finalizado
      })
      .catch((error) => {
        // Maneja los errores si la promesa es rechazada
        done.fail(error); // Indica que la prueba ha fallado y muestra el error
      });
  });
  it('Debería resolver con links después de aplicar función linksOn_Off cuando la ruta es un directorio y validate es false', (done) => {
    const inputPath = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/linkBroken.md';
    const validate = false;
    mdLinks(inputPath, validate)
      .then((result) => {
        // Realiza las aserciones correspondientes
        expect(Array.isArray(result)).toBe(true); // Verifica que el resultado sea un arreglo de links
        // Verifica que cada link tenga las propiedades adecuadas, por ejemplo, href, text y file
        result.forEach((link) => {
          expect(link).toHaveProperty('href');
          expect(link).toHaveProperty('text');
          expect(link).toHaveProperty('file');
          // Agrega más aserciones según tus necesidades
        });
        done(); // Indica que la prueba ha finalizado
      })
      .catch((error) => {
        // Maneja los errores si la promesa es rechazada
        done.fail(error); // Indica que la prueba ha fallado y muestra el error
      });
  });
});