#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const { handleError } =require('./data.js')
const colors = require('colors');

const argv = process.argv;
const mdPath = process.argv[2];
const validOptions = ["--validate", "--stats"];

if(argv.length < 3) {
    console.error(colors.red("Error: The argument 'Path' is required."))
    return;
  }

  if(argv[3] !== undefined && !validOptions.includes(argv[3])) {
    console.error(colors.red(`Error: The argument '${argv[3]}' is invalid, the valid options are: ${validOptions.join(", ")}`))
    return;
  }

  if(argv[4] !== undefined && !validOptions.includes(argv[4])) {
    console.error(colors.red(`Error: The argument '${argv[4]}' is invalid, the valid options are: ${validOptions.join(", ")}`))
    return;
  }

const cli = (path, argv) => {
    let options = {validate: false};
    if (argv.includes("--validate")) {
      options.validate = true;
    }

    mdLinks(path, options)
    .then((result) => {
      console.log(result);
    })
    .catch(handleError);
};

cli(mdPath, argv);