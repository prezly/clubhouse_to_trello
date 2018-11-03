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

const createLists = async (board_id) => {
    console.log('Setting up lists');

    const all_lists = await trello_client.getListsOnBoard(board_id);
    for(let list of all_lists) {
        //deleting all lists first
        let query = trello_client.createQuery();
        query.value = true;
        trello_client.makeRequest('put', '/1/lists/' + list.id + '/closed', query);
    }

    //creating them and waiting to not mess up ordering
    for (let estimation_point of estimation_scale) {
        await trello_client.addListToBoard(board_id,estimation_point);
    }

    return trello_client.addListToBoard(board_id,'For estimation');
};

module.exports = () => {
    //retrieve all epics
    clubhouse_client.listEpics().then((epics) => {
        epics_clean = epics.map(epic => epic.name);

        inquirer
            .prompt([
                {
                    type: 'checkbox',
                    name: 'epics',
                    message: 'Check the EPIC(s) for magic estimation',
                    choices: epics_clean
                },
            ])
            .then(answers => {
                const selected_epic_names = answers['epics'];
                const selected_epics = epics.filter(epic => {
                    return selected_epic_names.includes(epic['name']);
                });
                const selected_epic_ids = selected_epics.map((epic) => { return epic.id});
                const selected_epic_project_ids = selected_epics.map((epic) => epic.project_ids).reduce((ids, recordIds) => [...ids, ...recordIds], []).sort().filter((id, i, array) => array.indexOf(id) === i);

                trello_client.getOrgBoards(trello_organisation_name).then(async (boards) => {
                    let magic_estimation_board = boards.find(board => {
                        return board['name'] === trello_board_name;
                    });

                    //if it's not defined created it
                    if (!magic_estimation_board) {
                        console.log('Creating board ' + trello_board_name);

                        magic_estimation_board = await trello_client.addBoard(trello_board_name,trello_board_name);
                    } else {
                        console.log('Using existing board');
                    }

                    console.log(magic_estimation_board.shortUrl);

                    let list_for_estimation = await createLists(magic_estimation_board['id']);

                    //getting multiple projects here
                    let all_clubhouse_stories = [];
                    for(let project_id of selected_epic_project_ids) {
                        let stories_for_this_project = await clubhouse_client.listStories(project_id);
                        all_clubhouse_stories = [...all_clubhouse_stories,...stories_for_this_project];
                    }

                    //no needed as stories can only be in one project
                    // let unique_clubhouse_stories = all_clubhouse_stories.filter((item, pos) => {
                    //     return all_clubhouse_stories.indexOf(item) == pos;
                    // });

                    let stories_in_this_epic = all_clubhouse_stories.filter(story => {
                        return selected_epic_ids.includes(story['epic_id']);
                    });

                    for(let clubhouse_story of stories_in_this_epic) {
                        trello_client.addCard(`#${clubhouse_story['id']} - ${clubhouse_story['name']}`,clubhouse_story['app_url'], list_for_estimation['id']);
                    }
                });
            });
    });
}
