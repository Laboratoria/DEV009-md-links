#!/usr/bin/env node
const { mdLinks } = require('./index.js');
const { handleError, seeStats } = require('./data.js');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

const argv = process.argv;
const mdPath = process.argv[2];
const validOptions = ["--validate", "--stats"];

const cli = (path, argv) => {
  let options = { validate: false };
  if (argv.includes("--validate")) {
    options.validate = true;
  }

  const stats = {
    total: 0,
    unique: 0,
  };

  const processLinks = (links) => {
    if (argv.includes("--stats") && argv.includes("--validate")) {
      const brokenLinks = links.filter((link) => link.status !== 200 && link.ok === 'fail');
      stats.Broken = brokenLinks.length;
      console.log(stats);
    } else if (argv.includes("--stats")) {
      console.log(stats);
    } else {
      links.forEach((link) => {
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
  };

  const processPath = (path) => {
    if (fs.statSync(path).isFile()) {
      // Si el camino es un archivo, procesa ese archivo
      mdLinks(path, options)
        .then((links) => {
          stats.total += links.length;
          stats.unique += new Set(links.map((link) => link.href)).size;
          processLinks(links);
        })
        .catch(handleError);
    } else if (fs.statSync(path).isDirectory()) {
      // Si el camino es un directorio, busca en el directorio y subdirectorios
      mdLinks(path, options)
        .then((links) => {
          stats.total += links.length;
          stats.unique += new Set(links.map((link) => link.href)).size;
          processLinks(links);
        })
        .catch(handleError);
    } else {
      console.error(colors.red("Error: Invalid path."));
    }
  };

  processPath(mdPath);
};

cli(mdPath, argv);
