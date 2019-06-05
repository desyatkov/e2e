const inquirer = require('inquirer');
const fuzzy = require('fuzzy');
const chalk = require('chalk');
const FileSync = require('lowdb/adapters/FileSync');
const uniqid = require('uniqid');
const low = require('lowdb');
const api = require('../infra/sites');
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
    message: 'Select Site',
    source: api.searchSitesApi,
    pageSize: 5,
    validate: function(val) {
      return val ? true : 'Type something!';
    },
  },
  {
    type: 'autocomplete',
    name: 'page',
    suggestOnly: true,
    message: 'Select page',
    source: api.searchPagesApi,
    pageSize: 5,
    validate: function(val) {
      return val ? true : 'Type something!';
    },
    when: function() {

    }
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
    const url = answers.url + answers.page;
    db.get('tests')
      .push({url, id: uniqid(), testList: answers.testList})
      .write();
    console.log(chalk.green.bold("TEST ADDED SUCCESSFULLY"))
  });
