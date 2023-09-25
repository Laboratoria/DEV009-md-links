const { mdLinks} = require ('./index.js');

mdLinks('./docs/archivos.md', false)
.then((links) => {
    console.log(links);
})
.catch((error) => {
    console.error(error);
});

