const { mdLinks} = require ('./index.js');

mdLinks('./docs/archivos.md')
.then((links) => {
    console.log(links);
})
.catch((error) => {
    console.error(error);
});

