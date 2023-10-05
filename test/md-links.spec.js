const { mdLinks } = require('../index.js');
const {searchMdFiles, readdingFile} = require('../data.js')
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


describe('readdingFile', () => {
  it('debería entregar un array con el contenido del archivo cuando se lee correctamente', async () => {
    const filePath = 'C:\Users\Laboratoria\DEV009-md-links\test'; 
    const expectedContent = '[file.md, archivos.md, empty.md]'; 

    const result = await readdingFile(filePath);
    expect(result).toBe(expectedContent);
  });

  it('debería rechazar con un mensaje de error cuando ocurre un error al leer el archivo', async () => {
    const filePath = 'archivo.doc'; // Un archivo que no existe

    try {
      await readdingFile(filePath);
    } catch (error) {
      expect(error).toMatch('Ocurrió un error al leer el archivo:');
    }
  });
});






/*it('Debería rechazar con un error -Ocurrió un error al leer el archivo-', () => {
return expect(mdLinks('test\empty.md', true)).rejects.toMatch('Ocurrió un error al leer el archivo')});*/
