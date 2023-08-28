const mdLinks = require("../src/index.js")

describe("mdLinks", () => {
  it("debería rechazar con un error si la ruta no existe", () => {
    return mdLinks("/ruta/invalida").catch((error) => {
      expect(error.message).toBe("La ruta no existe");
    });
  });
  it("debería rechazar con un error si el archivo no es tipo Markdown", () => {
    return mdLinks("./src/index.js").catch((error) => {
      expect(error.message).toBe("El archivo no es de tipo Markdown");
    });
  });
  it("debe leer el archivo si es tipo Markdown", () => {
    return mdLinks("./README.md").then((data) => {
      expect(data).toBeDefined();
    });
  });
});

/*it ('Deberia devolver una promesa', () => {
    expect(mdLinks()).toBe(typeof Promise);
  });
  });/*


/*describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});*/
