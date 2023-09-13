const convertToAbsolutePath = require('../data.js');

const rutas = [
    '../DEV009-social-network/README.md',
    'README.md',
    '/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/docs/01-milestone.md',
    './/docs/02-milestone.md',
  
  ]
  

describe('convertToAbsolutePath', () => {
    it('should reject promise if path does not exist', () => {
      return convertToAbsolutePath('./esta/ruta/noexiste.md').catch((error)=>{
        expect(error).toBe('No existe la ruta');
      })
    });
    it('should return an absolut path', () => {
        return convertToAbsolutePath('README.md').then((result)=>{
          expect(result).toBe('/home/andrea/Documentos/Bootcamp Laboratoria/DEV009-md-links/README.md');
        })
      });

});