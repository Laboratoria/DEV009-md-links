const axios = require('axios');
const {pathExists, isMarkdownFile, verifyMarkdown, readFileContent, extractLinks, validateLinks, validateUrl, directoryExists, isDirectory  } = require('../data');
let colors = require('colors');
const fs = require('fs');

describe('pathExists', () => {
  describe('File Exist Check', () => {
    test('Should reject the promise if the path does not exist', () => {
      expect.assertions(1);

      const nonExistentPath = '/ruta/no/existe.md';

      return pathExists(nonExistentPath).catch((error) => {
        expect(error.message).toBe('The path does not exist.');
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
// testea la funcion que lee los archivos
describe('readFileContent Function', () => {
  test('Should resolve with file content when the file exists', () => {
    expect.assertions(2);

    const filePath = './example.md'

    return readFileContent(filePath).then((result) => {
      expect(result).toHaveProperty('absolutePath', filePath);
      expect(typeof result.data).toBe('string');
    });
  });

  test('Should reject with an error when the file does not exist', () => {
    expect.assertions(1);

    const nonExistentPath = './nonexistentfile.txt'; // Asegúrate de que este archivo no exista en tu proyecto

    return readFileContent(nonExistentPath).catch((error) => {
      expect(error.message).toBe('Can not read the file');
    });
  });
});
// testea la funcion que extrae los links
describe('extractLinks Function', () => {
  test('Should extract links from Markdown content', () => {
    expect.assertions(1);

    const markdownContent = '[Link 1](https://example1.com) [Link 2](https://example2.com)';

    return extractLinks({ absolutePath: '/ruta/del/archivo.md', data: markdownContent }).then((links) => {
      expect(links).toEqual([
        {
          href: 'https://example1.com',
          text: 'Link 1',
          file: '/ruta/del/archivo.md',
        },
        {
          href: 'https://example2.com',
          text: 'Link 2',
          file: '/ruta/del/archivo.md',
        },
      ]);
    });
  });

  test('Should reject with an error when no links are found', () => {
    expect.assertions(1);

    const markdownContent = 'This is some Markdown content without links.';

    return extractLinks({ absolutePath: '/ruta/del/archivo.md', data: markdownContent }).catch((error) => {
      expect(error.message).toBe('There are not links in the Markdown file.');
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

describe('Directory Exist Check', () => {
  it('Should reject with an error if the directory does not exist', () => {
    const directoryPath = './data_testing/badDirectory';

    return directoryExists(directoryPath).catch((error) => {
      expect(error.message).toBe('The path does not exist');
    });
  });
});

describe('Directory Check', () => {
  it('Should resolve with true if the path is a directory', () => {
    const directoryPath = './directory';

    return isDirectory(directoryPath).then((result) => {
      expect(result).toBe(true);
    });
  });

  it('Should reject with an error if the path is not a directory', () => {
    const filePath = './data_testing/sample.md';

    return isDirectory(filePath).catch((error) => {
      expect(error.message).toBe('The path is not a directory');
    });
  });
});

