const mdLinks = require('./md-links');

mdLinks('index.js').then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.log(error);
});

