const _ = require('lodash');
const fuzzy = require('fuzzy');

const sites = [
  'https://www.top10bestonlinecasinos.co.uk/',
  'https://www.betterplay.com'
];


exports.searchSitesApi = function searchSitesApi(answers, input) {
  input = input || '';
  return new Promise(function(resolve) {
      const fuzzyResult = fuzzy.filter(input, sites);
      resolve(
        fuzzyResult.map(function(el) {
          return el.original;
        })
      );
  });
};

exports.searchPagesApi = function searchSitesApi(answers, input) {
  input = input || '';
  const url = answers.url;
  return new Promise(function(resolve) {

    const { spawn } = require('child_process');
    const pyprog = spawn('python3',["./infra/get-urls.py", url] );

    pyprog.stdout.on('data', (data) => {
      const fuzzyResult = fuzzy.filter(input, JSON.parse(data).data);
      resolve(
        fuzzyResult.map(function(el) {
          return el.original;
        })
      );
    });

    pyprog.stderr.on('data', (data) => {
      console.log(data.toString());
    });

  });
};
