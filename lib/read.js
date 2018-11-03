if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

const inquirer = require('inquirer');

//https://developers.trello.com/page/authorization
const trello = require('trello');
const trello_client = new trello(process.env.TRELLO_API_KEY, process.env.TRELLO_OAUTH_TOKEN);
const trello_organisation_name = 'prezly';

const clubhouse = require('clubhouse-lib');
const clubhouse_client = clubhouse.create(process.env.CLUBHOUSE_TOKEN);


const { estimation_scale, trello_board_name } = require('./values');

const matcher = (regex, input) => {
    return () => {
        const match = regex.exec(input);
        const lastIndex = regex.lastIndex;
        return { lastIndex, match }
    }
};

module.exports = () => {

    trello_client.getOrgBoards(trello_organisation_name).then(async (boards) => {
        let magic_estimation_board = await boards.find(board => {
            return board['name'] === trello_board_name;
        });

        let lists = await trello_client.getListsOnBoard(magic_estimation_board['id']);
        let trello_cards = await trello_client.getCardsOnBoard(magic_estimation_board['id']);

        for(let card of trello_cards) {
            const card_clubhouse_id = card.name.match(/\#(.*) - /).pop();

            const card_list = lists.find((list) => { return list.id === card.idList});
            const card_story_points = card.idList;

            if (card_list['name'] !== 'For estimation') {
                console.log(`Story #${card_clubhouse_id} story points = ${card_list.name}`);

                //updating clubhouse
            } else {
                console.log(`Story #${card_clubhouse_id} not estimated yet`);
            }
        }
    });
};