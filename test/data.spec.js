const { pathResult, isAbsolute, fileMd, readingContent, extractingLinks, pathIsValid, linksOn_Off} = require('../src/data.js');
const axios = require('axios');

jest.mock('axios');

describe('linksOn_Off', () => {
  it('debería retornar un arreglo de objetos con el estado "ok" para links válidos', () => {
    const links = [
      { href: 'https://es.wikipedia.org/wiki/Los_Simpson', text: 'Los Simpson', file: 'src\textoPrueba.md' },
    ];

    // Configura el comportamiento simulado de axios para una respuesta exitosa
    axios.get.mockResolvedValue({ status: 200, statusText: 'OK' });

    return linksOn_Off(links).then((result) => {
        expect(result).toEqual([
          {
            href: 'https://es.wikipedia.org/wiki/Los_Simpson',
            text: 'Los Simpson',
            file: 'src\textoPrueba.md',
            status: 200,
            ok: 'ok',
          },
        ]);
      });
    });
  
    it('debería retornar un arreglo de objetos con el estado "fail" para links inválidos', () => {
      const links = [
        { href: 'http://www.ejemplo/kelly.com', text: 'EjemploKelly', file: 'src\textoPrueba.md' },
      ];
  
      axios.get.mockRejectedValue({ response: { status: 404 } });
  
      return linksOn_Off(links).then((result) => {
        expect(result).toEqual([
          {
            href: 'http://www.ejemplo/kelly.com',
            text: 'EjemploKelly',
            file: 'src\textoPrueba.md',
            status: 404,
            ok: 'fail',
          },
        ]);
      });
    });
  
    // Agrega más pruebas según sea necesario
  });
describe('isAbsolute', () => {
    it('Debería validar que es una ruta absoluta', () => {
        const file = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md';
        expect(isAbsolute(file)).toBe(true);
    });
    it('Debería validar que es una ruta relativa', () => {
        const file = 'textoPrueba.md';
        expect(isAbsolute(file)).toBe(false);
    });
})

describe('pathResult', () => {
    it('Debería resolver que esto es una ruta absoluta', () => {
        const file = 'textoPrueba.md';
        expect(pathResult(file)).toBe('C:\\Users\\Laboratoria\\Desktop\\Laboratoria\\DEV009-md-links\\textoPrueba.md');
    });
})

describe('pathIsValid', () => {
    it('Debería comprobar que existe la ruta', () => {
        const file = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md';
        expect(pathIsValid(file)).toBe(true);
    });
    it('Debería comprobar no existe la ruta', () => {
        const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/index.md';
        expect(pathIsValid(file)).toBe(false);
    });
})

describe('fileMd', () => {
    it('Debería comprobar que el archivo es markdown', () => {
        const file = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md';
        expect(fileMd(file)).toBe(true);
    });
    it('Debería comprobar que el archivo no es markdown', () => {
        const file = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/index.js';
        expect(fileMd(file)).toBe(false);
    });
})

describe('readingContent', () => {
    it('Debería leer el texto contenido en el archivo', (done) =>{
        const file = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPruebaDos.md';
        const awaitDataContent  = 'Las funciones están diseñadas para trabajar con promesas y devolver resultados adecuados según el caso.';
        readingContent(file).then((response) => {
            expect(response).toEqual(awaitDataContent );
            done();
        })
    });
})

describe('extractingLinks', () => {
    it('Debería resolver un arreglo de objetos con los links extraidos del archivo', (done) =>{
        const file = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md';
        const readDataContent = '[Los Simpson](https://es.wikipedia.org/wiki/Los_Simpson) [Futurama](https://es.wikipedia.org/wiki/Futurama) [Rugrats](https://es.wikipedia.org/wiki/Rugrats)';
        const awaitDataContent  = [
            {
              href: 'https://es.wikipedia.org/wiki/Los_Simpson',
              text: 'Los Simpson',
              file: '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Futurama',
              text: 'Futurama',
              file: '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Rugrats',
              text: 'Rugrats',
              file: '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPrueba.md'
            }
          ]
          extractingLinks(file, readDataContent).then((response) => {
            expect(response).toEqual(awaitDataContent );
            done();
          })
    });
    it('Debería rechazar si encuentra links dentro del archivo', (done) => {
        const file = '/Users/Laboratoria/Desktop/Laboratoria/DEV009-md-links/src/textoPruebaDos.md';
        const readDataContent = 'Las funciones están diseñadas para trabajar con promesas y devolver resultados adecuados según el caso.';
        extractingLinks(file, readDataContent).catch((response) => {
            expect(response).toBe('No se encontraron links en este archivo');
            done();
        })
    })
    it('Debería manejar contenido de Markdown sin links', () => {
        const pathFile = 'no-links.md';
        const readingContent = 'Este es un texto sin links';
    
        return extractingLinks(pathFile, readingContent).catch((error) => {
          expect(error).toBe('No se encontraron links en este archivo');
        });
      });
})