#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const { handleError, seeStats } = require('./data.js');
const colors = require('colors');

const argv = process.argv;
const mdPath = process.argv[2];
const validOptions = ["--validate", "--stats"];

if (argv.length < 3) {
  console.error(colors.red("Error: Path is required."));
  return;
}

const cli = (path, argv) => {
  let options = { validate: false };
  if (argv.includes("--validate")) {
    options.validate = true;
  }

  mdLinks(path, options)
    .then((result) => {
      console.log(result);
      if (argv.includes("--stats") && argv.includes("--validate")) {
        const stats = {
          ...seeStats(result, validOptions),
          "Broken": result.filter((link) => link.status !== 200 && link.ok === 'fail').length,
        };
        console.log(stats);
      } else if (argv.includes("--stats")) {
        console.log(seeStats(result, validOptions));
      } else {
        result.forEach((link) => {
          let linkText = link.text;
          if (linkText.length > 50) {
            linkText = truncateText(linkText, 50);
          }
          if (options.validate) {
            if (link.ok === 'ok') {
              console.log(`${link.file} ${link.href} ${colors.green('ok')} ${colors.green(link.status)} ${linkText}`);
            } else {
              console.log(`${link.file} ${link.href} ${colors.red('fail')} ${colors.red(link.status)} ${linkText}`);
            }            
          } else {
            console.log(`${link.file} ${link.href} ${linkText}`);
          }
        });
      }
    })
    .catch(handleError);
};

cli(mdPath, argv);
