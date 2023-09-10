const { mdLinks } = require('../mdlinks');
const axios = require('axios');
const { validateLinks } = require('../data');
let colors = require('colors');

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


// Mockear Axios
jest.mock('axios');

describe('validateLinks', () => {
  it('debería validar los enlaces exitosamente', () => {
    const links = [
      { href: 'http://example.com/link1' },
      { href: 'http://example.com/link2' },
    ];

    // Configura el comportamiento de Axios cuando se llama axios.get
    axios.get.mockResolvedValue({ status: 200 });

    // Llama a la función que deseas probar
    return validateLinks(links).then((validatedLinks) => {
      // Verifica que los enlaces validados tengan los valores esperados
      expect(validatedLinks).toEqual([
        { href: 'http://example.com/link1', status: 200, ok: 'ok'.green },
        { href: 'http://example.com/link2', status: 200, ok: 'ok'.green },
      ]);
    });
  });

  it('debería manejar errores de validación', () => {
    const links = [
      { href: 'http://example.com/link1' },
      { href: 'http://example.com/link2' },
    ];

    // Configura el comportamiento de Axios cuando se llama axios.get para simular un error
    axios.get.mockRejectedValue({ response: { status: 404 } });

    // Llama a la función que deseas probar
    return validateLinks(links).then((validatedLinks) => {
      // Verifica que los enlaces validados tengan los valores esperados
      expect(validatedLinks).toEqual([
        { href: 'http://example.com/link1', status: 404, ok: 'fail'.red },
        { href: 'http://example.com/link2', status: 404, ok: 'fail'.red },
      ]);
    });
  });
});


