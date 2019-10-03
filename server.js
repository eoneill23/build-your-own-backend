const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Oh hey FF Tracker');
});

app.listen(app.get('port'), () => {
  console.log(`Fantasy football tracker is running on http://localhost:${app.get('port')}.`);
});

app.get('/api/v1/players', (request, response) => {
  database('players').select()
    .then((players) => {
      response.status(200).json(players);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/teams', (request, response) => {
  database('teams').select()
    .then((teams) => {
      response.status(200).json(teams);
    })
    .catch((error) => {
      response.status(500).json({ error })
    });
});

app.get('/api/v1/teams/:id', (request, response) => {
  const { id } = request.params;
  database('teams')
  .select()
  .where({ id })
  .then((team) => {
    response.status(200).json(team)
  })
  .catch((error) => {
    response.status(404).json('Could not find that team.')
  })
});

app.get('/api/vi/players/:id', (request, response) => {
  const { id } = request.params;
  database('players')
  .select()
  .where({ id })
  .then((player) => {
    response.status(200).json(player)
  })
  .catch((error) => {
    response.status(404).json('Could not find that player.')
  })
})
