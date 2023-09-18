const { pathResult, isAbsolute, fileMd, readingContent, extractingLinks, pathIsValid } = require('../src/data.js');

describe('isAbsolute', () => {
    test('Debería validar que es una ruta absoluta', () => {
        const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/textoPrueba.md';
        expect(isAbsolute(file)).toBe(true);
    });
    test('Debería validar que es una ruta relativa', () => {
        const file = 'textoPrueba.md';
        expect(isAbsolute(file)).toBe(false);
    });
})

describe('pathResult', () => {
    test('Debería resolver que esto es una ruta absoluta', () => {
        const file = 'textoPrueba.md';
        expect(pathResult(file)).toBe('C:\\Users\\kelly\\Desktop\\LABORATORIA\\mdlinks\\DEV009-md-links\\textoPrueba.md');
    });
})

describe('pathIsValid', () => {
    test('Debería comprobar que existe la ruta', () => {
        const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/textoPrueba.md';
        expect(pathIsValid(file)).toBe(true);
    });
    test('Debería comprobar no existe la ruta', () => {
        const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/index.md';
        expect(pathIsValid(file)).toBe(false);
    });
})

describe('fileMd', () => {
    test('Debería comprobar que el archivo es markdown', () => {
        const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/textoPrueba.md';
        expect(fileMd(file)).toBe(true);
    });
    test('Debería comprobar que el archivo no es markdown', () => {
        const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/index.js';
        expect(fileMd(file)).toBe(false);
    });
})

describe('readingContent', () => {
    test('Debería leer el texto contenido en el archivo', (done) =>{
        const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/textoPruebaDos.md';
        const awaitDataContent  = 'Las funciones están diseñadas para trabajar con promesas y devolver resultados adecuados según el caso.';
        readingContent(file).then((response) => {
            expect(response).toEqual(awaitDataContent );
            done();
        })
    });
})

describe('extractingLinks', () => {
    test('Debería resolver un arreglo de objetos con los links extraidos del archivo', (done) =>{
        const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/textoPrueba.md';
        const readDataContent = '[Los Simpson](https://es.wikipedia.org/wiki/Los_Simpson) [Futurama](https://es.wikipedia.org/wiki/Futurama) [Rugrats](https://es.wikipedia.org/wiki/Rugrats)';
        const awaitDataContent  = [
            {
              href: 'https://es.wikipedia.org/wiki/Los_Simpson',
              text: 'Los Simpson',
              file: '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/textoPrueba.md'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Futurama',
              text: 'Futurama',
              file: '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/textoPrueba.md'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Rugrats',
              text: 'Rugrats',
              file: '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/textoPrueba.md'
            }
          ]
          extractingLinks(file, readDataContent).then((response) => {
            expect(response).toEqual(awaitDataContent );
            done();
          })
    });
    test('Debería rechazar si encuentra links dentro del archivo', (done) => {
        const file = '/Users/kelly/Desktop/LABORATORIA/mdlinks/DEV009-md-links/src/textoPruebaDos.md';
        const readDataContent = 'Las funciones están diseñadas para trabajar con promesas y devolver resultados adecuados según el caso.';
        extractingLinks(file, readDataContent).catch((response) => {
            expect(response).toBe('No se encontraron links en este archivo');
            done();
        })
    })
})