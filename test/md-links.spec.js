const { default: expect } = require("expect");
const { mdLinks } = require("../index.js");

describe("mdLinks", () => {
  test("debería retornar  un objeto con los links encontrados", () => {
    return mdLinks("prueba.md").then((res) => {
      expect(res).toEqual({
        exists: true,
        isMarkdown: true,
        file: "/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/prueba.md",
        links: [
          {
            href: "https://es.wikipedia.org/wiki/Markdown",
            text: "Markdown",
            file: "prueba.md",
          },
          { href: "https://nodejs.org/", text: "Node.js", file: "prueba.md" },
          {
            href: "https://nodejs.org/es/",
            text: "Node.js",
            file: "prueba.md",
          },
          {
            href: "https://developers.google.com/v8/",
            text: "motor de JavaScript V8 de Chrome",
            file: "prueba.md",
          },
        ],
      });
    });
  });
  it("comprueba que el archivo no existe", () => {
    return mdLinks("noExiste.js").catch((res) => {
      expect(res).toEqual("❌ no existe, ingresa una ruta correcta");
    });
  });



});
