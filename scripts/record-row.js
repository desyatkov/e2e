const inquirer = require('inquirer');
const fuzzy = require('fuzzy');
const FileSync = require('lowdb/adapters/FileSync');
const uniqid = require('uniqid');
const low = require('lowdb');
const searchSitesApi = require('../infra/sites');
const listFunctions = require('./parseTestFunc');

const adapter = new FileSync('infra/db.json');
const db = low(adapter);

inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt'));
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

inquirer.prompt([
  {
    type: 'autocomplete',
    name: 'url',
    suggestOnly: true,
    message: 'Select URL [tab to autocomplete]',
    source: searchSitesApi,
    pageSize: 5,
    validate: function(val) {
      return val ? true : 'Type something!';
    },
  },
  {
    type: 'checkbox-plus',
    name: 'testList',
    message: 'Select Test',
    pageSize: 10,
    highlight: true,
    searchable: true,
    default: [],
    validate: function(answer) {

      if (answer.length == 0) {
        return 'You must choose at least one color.';
      }

      return true;

    },
    source: function(answersSoFar, input) {

      input = input || '';

      return new Promise(function(resolve) {

        const fuzzyResult = fuzzy.filter(input, listFunctions, {
          extract: function(item) {
            return item['name'];
          }
        });

        const data = fuzzyResult.map(function(element) {
          return element.original;
        });

        resolve(data);

      });
  }
}]).then(function(answers) {
  db.get('tests')
    .push({...answers, id: uniqid()})
    .write()
});
