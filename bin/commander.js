#!/usr/bin/env node

const program = require('commander');

const start = require('../lib/start');
const finish = require('../lib/finish');
const clean = require('../lib/clean');
const testconfig = require('../lib/testconfig');

/*******************************************/

program
    .command('start')
    .description('Start by creating board and adding the cards')
    .action(() => { start(); });

program
    .command('finish')
    .description('Move estimations from trello board back into clubhouse story estimation points')
    .action(() => { finish(); });

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