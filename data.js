const axios = require('axios');

const validateLinks = (links) => {
  // Mapeamos los enlaces y para cada uno realizamos la validación
  const validatePromises = links.map((link) => {
    return validateUrl(link.href) // Llamamos a una función que realiza la validación individual
      .then((validateResult) => ({
        ...link,
        status: validateResult.status,
        ok: validateResult.ok,
      }));
  });

  return Promise.all(validatePromises);
};

const validateUrl = (url) => {
  return axios.get(url)
    .then(response => {
      return {
        status: response.status, //El código de estado HTTP
        ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail',
      };
    })
    .catch(error => {
      return {
        status: error.response ? error.response.status : 'No Response',
        ok: 'fail',
      };
    });
};

module.exports = { validateLinks };
