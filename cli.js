// const path = require('path');
// const { mdLink } = require('./index.js');


// const args = process.argv.slice(2);
// const filePath = args[0];

// if (!filePath) {
//   console.error('Por favor, ingresa ruta de directorio');
//   process.exit(1);
// }

// const validate = args.includes('--validate');
// const stats = args.includes('--stats');

// const options = {
//   validate,
//   stats,
// };

// mdLink(filePath, options)
//   .then((result) => {
//     if (stats) {
//       // Lógica para mostrar estadísticas
//       console.log('Estadísticas:');
//       console.log(`Total de links: ${result.length}`);
//       console.log(`Links únicos: ${new Set(result.map((link) => link.href)).size}`);
//       if (validate) {
//         console.log(`Links rotos: ${result.filter((link) => !link.ok).length}`);
//       }
//     } else {
//       // Lógica para mostrar los links
//       result.forEach((link) => {
//         console.log('-----------------------');
//         console.log(`Ruta del archivo: ${link.file}`);
//         console.log(`URL: ${link.href}`);
//         console.log(`Texto: ${link.text}`);
//         if (validate) {
//           console.log(`Estado: ${link.ok ? 'OK' : 'Fail'}`);
//           console.log(`Código de estado: ${link.status}`);
//         }
//       });
//     }
//   })
//   .catch((error) => {
//     console.error(`Error: ${error.message}`);
//   });
