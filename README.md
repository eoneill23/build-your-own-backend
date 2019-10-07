# Build your own backend
## Authors
Eric O'Neill ([eoneill23](https://github.com/eoneill23))

## Overview
Build your own backend is a fantasy football RESTful API that contains information on the top-25 scorers in fantasy football through the first four weeks of the 2019 season. I scraped `fantasy.nfl.com/research/scoring` leaders using [Cheerio](https://cheerio.js.org/).

It also contains a PostgreSQL database with a one-to-many relationship with players and the teams that they play for.

A user can GET all teams and all players, POST a new team or new player,and delete a player.

## Storyboard
https://github.com/eoneill23/build-your-own-backend/projects/2

## Learning goals
* Get comfortable building databases with Express, Knex, and PostgreSQL.
* Building a RESTful API for a dataset of my choosing.
* Plan and build a one-to-many relational database schema design.
* Deploy a back-end application to Heroku.

## Built with
* PostgreSQL
* Knex
* Express
* Node.js
* SQL
* PostgreSQL
* Cheerio

## Endpoints
| Url | Verb  | Options  | Sample Response  |
|---|---|---|---|
| `/api/v1/players` | GET | Not needed | An array of players: `[{"id": 1, "name": "Christian McCaffrey", "pos": "RB", "created_at": "2019-10-04T16:27:21.776Z", "updated_at": "2019-10-04T16:27:21.776Z",  "team_id": 1, "totalPoints": "111.9"},` |
| `/api/v1/teams` | GET | Not needed | An array of teams: `[{"id": 1, "name": "Panthers", "head_coach": "Ron Rivera","city": "Charlotte", "created_at": "2019-10-04T16:27:21.693Z", "updated_at": "2019-10-04T16:27:21.693Z", "state": "NC"}, ...]` |
| `/api/v1/teams/:id` | GET | Not needed | A specific team: `[{"id": 1, "name": "Panthers", "head_coach": "Ron Rivera","city": "Charlotte", "created_at": "2019-10-04T16:27:21.693Z", "updated_at": "2019-10-04T16:27:21.693Z", "state": "NC"}]` |
| `/api/v1/players/:id`  | GET | Not needed | A specific player: `[{"id": 1, "name": "Christian McCaffrey", "pos": "RB", "created_at": "2019-10-04T16:27:21.776Z", "updated_at": "2019-10-04T16:27:21.776Z",  "team_id": 1, "totalPoints": "111.9"}]` |
| `/api/v1/teams` | POST | {"name": `string`, "head_coach": `string`, "city": `string`,"state": `string`} | The id of the created team: `{"id": 1}` |
| `/api/v1/players` | POST | {"name": `string`, "pos": `string`, "totalPoints": `string`, "team_id": `integer`} | The id of the created player: `{"id": 26}`  |
| `/api/v1/players/:id` | DELETE | Not needed | A deleted player: `Successfully deleted player!` |
