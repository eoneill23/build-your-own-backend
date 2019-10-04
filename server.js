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

app.get('/api/v1/players/:id', (request, response) => {
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
});

app.post('/api/v1/teams', (request, response) => {
  const team = request.body;
  for (let requiredParameter of [
    'name',
    'head_coach',
    'city',
    'state'
  ]) {
    if (!team[requiredParameter]) {
      return response
      .status(422)
      .send({ error: `Expected format: { name: <string> head_coach: <string> city: <string> state: <string>  }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('teams').insert(team, 'id')
  .then((team) => {
      response.status(201).json({ id: team[0] })
    })
    .catch((error) => {
      console.log(error)
      response.status(500).json({ error });
    });
});

app.post('/api/v1/players', (request, response) => {
  const player = request.body;
  for (let requiredParameter of [
    'name',
    'pos',
    'totalPoints',
    'team_id'
  ]) {
    if (!player[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <string> pos: <string> totalPoints: <string> team_id: <string>  }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('players').insert(player, 'id')
    .then((player) => {
      response.status(201).json({ id: player[0] })
    })
    .catch((error) => {
      console.log(error)
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/players/:id', (req, res) => {
  const { id } = req.params;
  database('players')
    .where({ id: id })
    .del()
    .then(() =>
      database('players')
        .where({ id })
        .del()
        .then(() => res.status(204).json('Successfully deleted player'))
        .catch(error =>
          res.status(500).json('Cannot remove player at this time')
        )
    );
});