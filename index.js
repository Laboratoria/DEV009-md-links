const { mdLinks }= require('./mdlinks');

mdLinks('./README.md')
  .then(links => {
    console.log('Enlaces encontrados:');
    links.forEach(link => {
      console.log(`Texto: ${link.text}`);
      console.log(`URL: ${link.href}`);
      console.log('---');
    });
  })
  .catch(error => console.error(error.message));