if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const trello = require('trello');
const trello_client = new trello(process.env.TRELLO_API_KEY, process.env.TRELLO_OAUTH_TOKEN);

const trello_organisation_name = 'prezly';

const { trello_board_name } = require('./values');

module.exports = () => {
    trello_client.getOrgBoards(trello_organisation_name).then(async (boards) => {
        let magic_estimation_board = await boards.find(board => {
            return board['name'] === trello_board_name;
        });

        console.log('deleting the magic estimation board');
        let query = trello_client.createQuery();
        query.value = true;
        await trello_client.makeRequest('put', '/1/boards/' + magic_estimation_board['id'] + '/closed', query);
        trello_client.makeRequest('delete', '/1/boards/' + magic_estimation_board['id'], query);

    });

}
