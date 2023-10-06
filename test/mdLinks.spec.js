const { default: test } = require('node:test');
const { mdLinks } = require('../index.js');

describe('mdLinks', () => {

    it('Debería rechazar la promesa si el archivo no es markdown', (done) => {
      const file = 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\test.doc';
      mdLinks(file).catch((response) => {
        expect(response).toBe('Error: El archivo no es Markdown')
        done();
      })
    });
    it('Debería rechazar la promesa si la ruta no existe', (done) => {
      const file = 'C:\\Users\\CamiFlores\\DEV009-md-links\\docs';
      mdLinks(file).catch((response) => {
        expect(response).toBe('Error: la ruta no existe');
        done();
      })
    });
    it('Debería resolver un arreglo con un objeto', (done) => {
      const file = 'test/file.md';
      mdLinks(file, false).then((response) => {
        expect(response.length).toBe(1);
        done();
      })
    });
    it('Debería resolver un arreglo que incluya el estado de los links', (done) => {
      const file = 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\file.md';
      const expectedData = [
        {
          text: 'mdlinks-example',
          href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680',
          file: 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\file.md',
          status: 200,
          statusText: 'ok'
        }
      ]
      mdLinks(file, true).then((response) => {
        expect(response).toEqual(expectedData);
        done();
      })
    });
    it('Debería resolver un arreglo con 3 propiedades de los links: href, text, file', (done) => {
      const file = 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\file.md';
      const expectedData = [
        {
          text: 'mdlinks-example',
          href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680',
          file: 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\file.md'
        }
      ]
      mdLinks(file, false).then((response) => {
        expect(response).toEqual(expectedData);
        done();
      })
    });
    it('Debería retornar un objeto con status y statusText de los links de un directorio', (done) => {
      const file = 'test';
      const expectedData = [
  {
    text: 'Markdown',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    file: 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\archivos.md',
    status: 200,
    statusText: 'ok'
  },
  {
    text: 'Node.js',
    href: 'https://nodejs.org/dev009',
    file: 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\archivos.md',
    status: 404,
    statusText: 'fail'
  },
  {
    text: 'motor de JavaScript V8 de Chrome',
    href: 'https://developers.google.com/v8/',
    file: 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\archivos.md',
    status: 200,
    statusText: 'ok'
  },
  {
    text: 'Node.js',
    href: 'https://nodejs.org/dev009',
    file: 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\archivos.md',
    status: 404,
    statusText: 'fail'
  },
  {
    text: 'mdlinks-example',
    href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680',
    file: 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\file.md',
    status: 200,
    statusText: 'ok'
  }
]
      mdLinks(file, true).then((response) => {
        expect(response).toEqual(expectedData);
        done();
      })
    });
  })