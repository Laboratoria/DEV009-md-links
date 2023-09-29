
const { mdLinks } = require("../index.js");

//const pathNoExist = "noExiste.md"
const file = "prueba.md"

describe("mdLinks", () => {
  
  test("debería retornar  un array de objetos con los links encontrados", () => {
    return mdLinks(file).then((res) => {
      expect(res).toEqual(
        [
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
          },
        ]
      
      );
    });
  });
  // it("comprueba que el archivo no existe", () => {
  //   return mdLinks(pathNoExist).catch((error) => {
  //     expect(error).toBe("❌ no existe, ingresa una ruta correcta");
  //   });
  // });



});
