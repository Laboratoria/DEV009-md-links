// // const {  } = require('../index.js');
// const { mdLink } = require('../mdLink.js');


// describe('mdLinks', () => {
//   it('debería devolver  propiedades href, text y file', (done) => {
//     const filePath = 'ruta/a/tu/archivo.md'; // Ruta a un archivo existente con enlaces
//     mdLinks(filePath)
//       .then((links) => {
//         expect(Array.isArray(links)).toBe(true);
//         expect(links.length).toBeGreaterThan(0);

//         links.forEach((link) => {
//           expect(link).toHaveProperty('href');
//           expect(link).toHaveProperty('text');
//           expect(link).toHaveProperty('file');
//         });

//         done(); // Indica que el test ha terminado
//       })
//       .catch((error) => {
//         done(error); 
//       });
//   });
