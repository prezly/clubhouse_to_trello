#!/usr/bin/env node

const program = require('commander');

const create = require('../lib/create');
const read = require('../lib/read');
const clean = require('../lib/clean');
const testconfig = require('../lib/testconfig');

/*******************************************/

program
    .command('create')
    .description('Create trello board and cards')
    .action(() => { create(); });

program
    .command('read')
    .description('Read trello board and update clubhouse estimation points')
    .action(() => { read(); });

program
    .command('clean')
    .description('Clean up the board/cards/list')
    .action(() => { clean(); });

program
    .command('testconfig')
    .description('Test your config (connect to trello and clubhouse)')
    .action(() => { testconfig(); });


// allow commander to parse `process.argv`
program.parse(process.argv);