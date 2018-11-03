# clubhouse_to_trello

This is a commandline script to use drag-and-drop functionality in trello to estimate story points.
It creates a trello board, creates a few lists (1,2,3,5,8,13) and creates a trello card per story.
When you are done you can sync back those scores to clubhouse story points.

## Usage

```sh
npm i
cp .env.example .env
npm run script
```

## Local Usage

Check out this repository and install dependencies:

```bash
git clone https://github.com/prezly/clubhouse_to_trello
cd movable-cli
npm i
```

Now you can run commands like `c2t create` using your local `clubhouse_to_trello-cli`.
If you want to set up `c2t` to use a non-production server, you can create a file such as `~/.env.example` where you set some environment variables:

```bash
export TRELLO_API_KEY=changeme0000000
export TRELLO_OAUTH_TOKEN=changeme000000
export CLUBHOUSE_TOKEN=changeme0000000
```

## License

See LICENSE.md.
