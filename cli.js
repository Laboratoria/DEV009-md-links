const { mdLinks} = require ('./index.js');

mdLinks('./docs', true)
.then((links) => {
    console.log(links);
})
.catch((error) => {
    console.error(error);
});

