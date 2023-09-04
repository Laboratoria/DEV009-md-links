const mdLinks = require('../mdlinks');

describe('mdLinks', () => {
  // Testea si es un promise y retorna un array 
  it('Should return a Promise', (done) => {
    mdLinks('./README.md')
      .then((links) => {
        expect(links).toBeInstanceOf(Array);
        done(); // Llama a done() para indicar que la prueba ha finalizado
      })
      .catch((error) => {
        done(error); // Llama a done(error) si ocurre un error durante la prueba
      });
  });

  // Testea si la ruta no existe
  test('Should reject the promise if the path does not exist', () => {
    expect.assertions(1); // Asegura que se realice al menos una afirmación dentro de la prueba

    const isNothaPath = '/ruta/no/existe.md';

    return expect(mdLinks(isNothaPath)).rejects.toThrow('The route does not exist.');
  });

  // Testea si el archivo tiene la extension .md 
  test('Should throw an error if the file is not a markdown file', () => {
    expect(() => mdLinks('./example.md')).rejects.toThrow('The file is not a Markdown (.md).');
  });
});
