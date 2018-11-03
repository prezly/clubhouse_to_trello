#!/usr/bin/env node

const program = require('commander');

const start = require('../lib/start');
const finish = require('../lib/finish');
const clean = require('../lib/clean');
const testconfig = require('../lib/testconfig');

/*******************************************/

program
    .command('start')
    .alias('create_board')
    .description('Start by creating board and adding the cards')
    .action(() => { start(); });

program
    .command('finish')
    .alias('update_points')
    .description('Move estimations from trello board back into clubhouse story estimation points')
    .action(() => { finish(); });

program
    .command('clean')
    .alias('delete')
    .description('Clean up the board/cards/list')
    .action(() => { clean(); });

program
    .command('test')
    .alias('testconfig')
    .description('Test your config (connect to trello and clubhouse)')
    .action(() => { testconfig(); });


// allow commander to parse `process.argv`
program.parse(process.argv);