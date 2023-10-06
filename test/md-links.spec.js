const { erase } = require("sisteransi");
const { mdLinks } = require("../index.js");
const { default: expect } = require("expect");

const pathNoExist = "noExiste.md";
const file = "prueba.md";
const pathOtherExtenxion = "prueba.js";
const directoryPath = "ejem-directorio";

describe("mdLinks", () => {
  test("debería retornar  un array de objetos con los links encontrados", () => {
    return mdLinks(file).then((res) => {
      expect(res).toEqual([
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
          href: "https://developers.google.com/v8",
          text: "motor de JavaScript V8 de Chrome",
          file: "prueba.md",
        },
        {
          href: "https://es.wikipedia.org/wiki/Markdown/dev009",
          text: "Markdown",
          file: "prueba.md",
        },
      ]);
    });
  });
  it("comprueba que el archivo no existe", () => {
    return mdLinks(pathNoExist).catch((error) => {
      expect(error).toBe("❌ no existe, ingresa una ruta correcta");
    });
  });

  it("el archivo no es markdown", () => {
    return mdLinks(pathOtherExtenxion).catch((error) => {
      expect(error).toBe("❌ No es un archivo markdown");
    });
  });

  it("Debería retornar una lista de objetos del directorio que contengan las propiedades: href, text, file", () => {
    return mdLinks(directoryPath).then((linkDirectory) => {
      expect(linkDirectory).toEqual([
        {
          file: "/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md",
          href: "https://es.wikipedia.org/wiki/Markdown",
          text: "MarkdownM",
        },
        {
          file: "/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md",
          href: "https://nodejs.org/",
          text: "Node.js",
        },
        {
          file: "/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md",
          href: "https://es.wikipedia.org/wiki/noExiste",
          text: "Markdown",
        },
        {
          file: "/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md",
          href: "https://es.airbnb.com/",
          text: "arb&b",
        },
        {
          file: "/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/sub-directorio/fl_viajes.md",
          href: "https://www.google.com/",
          text: "Google",
        },
        {
          file: "/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/sub-directorio/fl_viajes.md",
          href: "https://www.google.com/dev009",
          text: "Google/Dev009",
        },
        {
          file: "/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/sub-directorio/fl_viajes.md",
          href: "https://es.airbnb.com/",
          text: "arb&b",
        },
      ]);
    });
  });

  it("Debería retornar una lista de objetos validados que contengan las propiedades: href, text, file, status y statusText", () => {
    return mdLinks(directoryPath, true).then(linkList => {
      expect(linkList).toEqual([
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'MarkdownM',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://es.wikipedia.org/wiki/noExiste',
          text: 'Markdown',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md',
          status: 404,
          ok: 'fail'
        },
        {
          href: 'https://es.airbnb.com/',
          text: 'arb&b',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://www.google.com/',
          text: 'Google',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/sub-directorio/fl_viajes.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://www.google.com/dev009',
          text: 'Google/Dev009',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/sub-directorio/fl_viajes.md',
          status: 404,
          ok: 'fail'
        },
        {
          href: 'https://es.airbnb.com/',
          text: 'arb&b',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/sub-directorio/fl_viajes.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'MarkdownM',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://es.wikipedia.org/wiki/noExiste',
          text: 'Markdown',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md',
          status: 404,
          ok: 'fail'
        },
        {
          href: 'https://es.airbnb.com/',
          text: 'arb&b',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/readme.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://www.google.com/',
          text: 'Google',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/sub-directorio/fl_viajes.md',
          status: 200,
          ok: 'ok'
        },
        {
          href: 'https://www.google.com/dev009',
          text: 'Google/Dev009',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/sub-directorio/fl_viajes.md',
          status: 404,
          ok: 'fail'
        },
        {
          href: 'https://es.airbnb.com/',
          text: 'arb&b',
          file: '/Users/nancyacontreras/Documents/NAWORKSPACE/DEV009-md-links/ejem-directorio/sub-directorio/fl_viajes.md',
          status: 200,
          ok: 'ok'
        }
      ]);
    });
  });

  ///
});
