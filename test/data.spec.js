
const { searchMdFiles, readdingFile, readdingFileMdDirectory, searchLinks } = require('../data.js')
const fs = require('fs');
const path = require('path');


describe('searchMdFiles', () => {
  it('Debería retornar true para archivos Markdown (.md)', () => {
    const filePath = 'archivos.md';
    const result = searchMdFiles(filePath);
    expect(result).toBe(true);
  });

  it('Debería retornar false para archivos no Markdown', () => {
    const filePath = 'test.doc';
    const result = searchMdFiles(filePath);
    expect(result).toBe(false);
  });
});

/*readdingFile(file).then((response) => {
  // Código que se ejecuta cuando la promesa se resuelve exitosamente
  expect(response).toBe(expectedData);
  done();
}).catch((error) => {
  // Código que se ejecuta cuando la promesa se rechaza con un error
  // Puedes manejar el error aquí si es necesario
});*/

describe('readdingFile', () => {
  it('deberia arrojar error si el archivo no es .md', () => {
    return expect(readdingFile('test\test.doc')).rejects.toBe('Error: Ocurrió un error al leer el archivo');
  })

  /* it('deberia leer el archivo si es .md', () => {
     retrun expect(readdingFile('test\archivos.md')).toEqual()
   })*/
})

describe('readdingFileMdDirectory', () => {
  it('deberia arrojar error si el archivo no es .md', () => {
    return expect(readdingFileMdDirectory('test\test.doc')).rejects.toMatch('Error: Ocurrió un error al leer el archivo');
  })
})
  
  it('Lee el directorio en busca de archivos .md, y retorna un objeto con las 3 propiedades de cada link encontrado', () => {
  return expect(readdingFileMdDirectory('test/file.md')).resolves.toContain('[mdlinks-example](https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680)');
});


describe('searchLinks', () => {
  const data = '[mdlinks-example](https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680)'
  it('retorna un objeto con 3 propiedades de un link', () => {
    return expect(searchLinks(data,'test\file.md')).toEqual([
      { 
        file: 'test\file.md',
        href: 'https://github.com/Laboratoria/bootcamp/assets/123121338/7dcc83c4-873e-4ef8-b7d0-a15adb102680',
        text: 'mdlinks-example',
      }
    ])
  });
});





/*describe('readdingFile', () => {
  it('debería leer un archivo', () => {
    return readdingFile('test\archivos.md').then((data) => {
      expect(data).toBeDefined();
     
    });
  });*/





/*describe('readdingFile', () => {
  test('debería leer el contenido del archivo', (done) => {
    const file = 'C:\\Users\\Laboratoria\\DEV009-md-links\\test\\archivos.md'; 
    const expectedData = 'Este test unitario es una prueba'; 
    readdingFile(file).then((response) => { 
      expect(response).toBe(expectedData);
      done();
    });
  });
});*/

