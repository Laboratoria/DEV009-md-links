const mdLinks = require('./md-links');

mdLinks('').then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.log(error);
});

