const _ = require('lodash');
const fuzzy = require('fuzzy');

const sites = [
  'https://www.top10bestonlinecasinos.co.uk/'
];


module.exports = function searchSitesApi(answers, input) {
  input = input || '';
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, sites);
      resolve(
        fuzzyResult.map(function(el) {
          return el.original;
        })
      );
    }, _.random(30, 500));
  });
};
