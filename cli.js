const { mdLinks } = require('./index.js');
mdLinks('test-folder/readmeTest.md').then((resolve) =>{
    console.log(resolve);
})
.catch((error) => {
    console.log(error);
})