if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const trello = require('trello');
const trello_client = new trello(123, process.env.TRELLO_OAUTH_TOKEN);
const trello_organisation_name = 'prezly';

const clubhouse = require('clubhouse-lib');
const clubhouse_client = clubhouse.create(process.env.CLUBHOUSE_TOKEN);
//const clubhouse_client = clubhouse.create("123");

module.exports = () => {
    clubhouse_client.listMembers()
        .then(() => console.log('connection to clubhouse successful'))
        .catch((err) => console.log('connection to clubhouse failed'));

    promise = trello_client.getOrgBoards(trello_organisation_name);
    promise.error(function(data) {
        console.log('connection to trello successul');
    });
        // .error(function(data, status) {
        //     // Handle HTTP error
        // })
        // .finally(function() {
        //     // Execute logic independent of success/error
        // })
        // .catch(function(error) {
        //     // Catch and handle exceptions from success/error/finally functions
        // });



};