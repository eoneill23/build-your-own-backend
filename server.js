const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

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

app.get('/api/vi/teams', (request, response) => {
  database('teams').select()
    .then((teams) => {
      response.status(200).json(teams);
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
})
