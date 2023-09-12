const mdLinks = require('./md-links');

mdLinks('README.md').then((path)=>{
  console.log(path)
}).catch((error)=>{
  console.log(error);
});

