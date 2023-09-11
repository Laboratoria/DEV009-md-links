const { mdLinks } = require('../mdlinks');
const axios = require('axios');
const { validateLinks, pathExists, isMarkdownFile, verifyMarkdown } = require('../data');
let colors = require('colors');
const fs = require('fs');

describe('pathExists', () => {
  describe('File Exist Check', () => {
    test('Should reject the promise if the path does not exist', () => {
      expect.assertions(1);

      const nonExistentPath = '/ruta/no/existe.md';

      return pathExists(nonExistentPath).catch((error) => {
        expect(error.message).toBe('La ruta no existe.');
      });
    });
  });

  describe('Markdown File Check', () => {
    test('Should throw an error if the file is not a markdown file', () => {
      expect.assertions(1);

      const nonmdfile = './thumb.png';
      return  verifyMarkdown(nonmdfile).catch((error) => {
        expect(error.message).toBe('The file is not a Markdown (.md).');
      });
    });

    
  });
});

// Mockear Axios
jest.mock('axios');

describe('validateLinks', () => {
  it('Should validate links succesfully', () => {
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
        { href: 'http://example.com/link1', status: 200, ok: 'ok' },
        { href: 'http://example.com/link2', status: 200, ok: 'ok'},
      ]);
    });
  });

  it('Should manage a validation error', () => {
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
        { href: 'http://example.com/link1', status: 404, ok: 'fail' },
        { href: 'http://example.com/link2', status: 404, ok: 'fail' },
      ]);
    });
  });
});


//validate looking files into a directory

describe('mdLinks', () => {
  describe('Directory Exist Check', () => {

    it('Should reject with an error if there are no correct directory', () => {
      const directoryPath = './data_testing/badDirectory';

      return mdLinks(directoryPath).catch((error) => {
        expect(error.message).toBe('La ruta del directorio no existe.');
      });
    });
  });
});