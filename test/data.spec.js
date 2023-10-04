const { default: expect } = require("expect");
const {
  fn_myFileExist,
  fn_convertAbsoluteFile,
  fn_isMarkdownFile,
  fn_getLinks,
  fn_validateUrl,
  readAllFiles,
} = require("../data.js");

const axios = require("axios");

describe("fn_myFileExist", () => {
  test("el archivo existe", () => {
    return fn_myFileExist("prueba.md").then((res) => {
      expect(res).toBe(true);
    });
  });

  it("el archivo no existe", () => {
    return fn_myFileExist("noExiste.js").catch((res) => {
      expect(res).toBe(false);
    });
  });

  test("deberia transformarla a una ruta relativa a absoluta", () => {
    const relativePath = "prueba.md";
    const absolutePath = fn_convertAbsoluteFile(relativePath);
    expect(absolutePath).toBe(
      "/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/prueba.md"
    );
  });

  test("comprueba si un archivo ES Markdown", () => {
    const isMarkdown = "prueba.md";
    expect(fn_isMarkdownFile(isMarkdown)).toBe(".md");
  });

  test("comprueba que NO es un archivo Markdown", () => {
    const isNotMarkdown = "noEsMarkdow.txt";
    expect(fn_isMarkdownFile(isNotMarkdown)).toBe(".txt");
  });

 
  test("debería retornar los enlaces encontrados", () => {
    const files = ["prueba.md"]
    return fn_getLinks(files).then((data) => {
      expect(data).toEqual([
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'prueba.md'
        },
        { href: 'https://nodejs.org/', text: 'Node.js', file: 'prueba.md' },
        {
          href: 'https://nodejs.org/es/',
          text: 'Node.js',
          file: 'prueba.md'
        },
        {
          href: 'https://developers.google.com/v8',
          text: 'motor de JavaScript V8 de Chrome',
          file: 'prueba.md'
        },
        {
          href: 'https://es.wikipedia.org/wiki/Markdown/dev009',
          text: 'Markdown',
          file: 'prueba.md'
        }
      ]);
    });
  });

 test('debería retornar los archivos markdown encontrados en el directorio', () => {
      const dirPath = "./ejem-directorio"
      return readAllFiles(dirPath).then((data) => {
      expect(data).toEqual([
        "./ejem-directorio/readme.md", 
        "./ejem-directorio/sub-directorio/fl_viajes.md"
      ]);
    });
  });

  


  //
});
