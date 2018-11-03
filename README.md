# clubhouse_to_trello

This is a commandline script to use drag-and-drop functionality in trello to estimate story points.
It creates a trello board, creates a few lists (1,2,3,5,8,13) and creates a trello card per story.

When you are done you can sync back those scores to clubhouse story points.

## Installing globally

```sh
git clone https://github.com/prezly/clubhouse_to_trello
cd clubhouse_to_trello
npm i
cp .env.example .env
npm install -g ./
```

Make sure to set up environment variables with your trello and api credentials. `cp .env.example .env`

## Local Usage

Now you can run commands like `clubhouse_to_trello create` using your local `clubhouse_to_trello-cli`.

```bash
Usage: c2t [options] [command]

Options:
  -h, --help  output usage information

Commands:
  start       Create trello board and cards in 'for estimation' list
  finish      Read trello board and update clubhouse estimation points
  clean       Clean up the board/cards/list
  testconfig  Test your config (connect to trello and clubhouse)
```


If you want to set up `c2t` to use a non-production server, you can create a file such as `~/.env.example` where you set some environment variables:

```bash
export TRELLO_API_KEY=changeme0000000
export TRELLO_OAUTH_TOKEN=changeme000000
export CLUBHOUSE_TOKEN=changeme0000000
c2t -h
```

## License

See LICENSE.md.
