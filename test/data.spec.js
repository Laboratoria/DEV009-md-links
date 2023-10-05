const axios = require('axios');
const { validateUrl } = require('../data');
jest.mock('axios');

describe('validateUrl', () => {
  it('debería retornar un objeto con 5 propiedades y el status 200 de la url encontrada', async () => {
    const links = [{ href: 'https://developers.google.com/v8/', text: 'Google V8', file: 'archivo.md' }];
    
    // Simula una validación ok de Axios
    axios.get.mockResolvedValue({ status: 200 });

    // Llama a validateUrl con objeto de 5 propiedades, donde 200 es el link validado
    const result = await validateUrl(links);

    expect(result).toEqual([
      {
        text: 'Google V8',
        href: 'https://developers.google.com/v8/',
        file: 'archivo.md',
        status: 200,
        statusText: 'ok',
      },
    ]);
  });

  it('debería retornar un objeto con 5 propiedades y el status 404 de la url encontrada', async () => {
    const links = [{ href: 'https://developers.google.com/v89/', text: 'Google V8', file: 'archivo.md' }];
    
    // Simula una respuesta con error de Axios
    axios.get.mockRejectedValue({ response: { status: 404 } });

    // Llama a validateUrl con objeto de 5 propiedades, donde 404 es el link validado
    const result = await validateUrl(links);

    expect(result).toEqual([
      {
        text: 'Google V8',
        href: 'https://developers.google.com/v89/',
        file: 'archivo.md',
        status: 404,
        statusText: 'fail',
      },
    ]);
  });
});

 /* it('deberia rechazar si la URL no es válida', ()=>{
    axios.get.mockRejectedValue({status:404})
    return expect(validateUrl('https://nodejs.org/dev009')).rejects.toBe(404)
  })*/

  // --ESPIA--
  describe('validateUrl', () => {
    it('debería retornar un objeto con 5 propiedades y el status 200 de la url encontrada', async () => {
      const links = [{ href: 'https://developers.google.com/v8/', text: 'Google V8', file: 'archivo.md' }];
      
      // Simula una respuesta exitosa de Axios
      jest.spyOn(axios,'get').mockResolvedValue({ status: 200 });
  
      // Llama a validateUrl con objeto de 5 propiedades, donde 200 es el link validado
      const result = await validateUrl(links);
  
      expect(result).toEqual([
        {
          text: 'Google V8',
          href: 'https://developers.google.com/v8/',
          file: 'archivo.md',
          status: 200,
          statusText: 'ok',
        },
      ]);
    });
  
    it('debería retornar un objeto con 5 propiedades y el status 404 de la url encontrada', async () => {
      const links = [{ href: 'https://developers.google.com/v89/', text: 'Google V8', file: 'archivo.md' }];
      
      // Simula una respuesta con error de Axios
      jest.spyOn(axios, 'get').mockRejectedValue({ response: { status: 404 } });
  
      // Llama a validateUrl con objeto de 5 propiedades, donde 404 es el link validado
      const result = await validateUrl(links);
  
      expect(result).toEqual([
        {
          text: 'Google V8',
          href: 'https://developers.google.com/v89/',
          file: 'archivo.md',
          status: 404,
          statusText: 'fail',
        },
      ]);
    });
  });

