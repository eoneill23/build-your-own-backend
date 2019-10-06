//This requires express
const express = require('express');

//This creates the app variable that utilizes express.
const app = express();

//This creates the app where the app is deployed. Either its environment of a development environment.
const environment = process.env.NODE_ENV || 'development';

//This sets up the environment from the knexfile, either production or development.
const configuration = require('./knexfile')[environment];

//This sets up the connection to the PostgreSQL database.
const database = require('knex')(configuration);

//This sets the port that I am connecting to. Either the platform (Heroku) where the app is deployed or localhost3000 if the app is deployed locally.
app.set('port', process.env.PORT || 3000);

//This allows my app to use and parse JSON data.
app.use(express.json());

//This returns the text to let the user know that the app is up and running.
app.get('/', (request, response) => {
  response.send('Oh hey FF Tracker');
});

//This console.logs the port on which the app is running.
app.listen(app.get('port'), () => {
  console.log(`Fantasy football tracker is running on http://localhost:${app.get('port')}.`);
});

//This endpoint returns an array of all players.
app.get('/api/v1/players', (request, response) => {
//This connects to the players database and returns all rows in the database.
  database('players').select()
    .then((players) => {
      //If the request is handled successfull, it returns a 200-level status and returns the players array in a JSON format.
      response.status(200).json(players);
    })
    //If there is an error retrieving the players from the database, a 500-level status error is returned, and the error is returned in a JSON format.
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//This endpoint returns an array of all teams.
app.get('/api/v1/teams', (request, response) => {
  //This connects to the teams database and selects all rows in the database.
  database('teams').select()
  //If the request is successful, it returns a 200-level status and returns the teams array in a JSON format.
    .then((teams) => {
      response.status(200).json(teams);
    })
    //If there is an error in the request, a 500-level status is returned and the error is returned in a JSON format.
    .catch((error) => {
      response.status(500).json({ error })
    });
});

//This endpoint returns a specific team based on an id.
app.get('/api/v1/teams/:id', (request, response) => {
  //The id is pulled out of the request parameters and destructured.
  const { id } = request.params;
  //This connects to the teams database.
  database('teams')
  .select()
  //This selects the team in the database where the id matches the destructured id on line 63.
  .where({ id })
  //If the request is successful, a 200-level status is returned and returns the team object in a JSON format.
  .then((team) => {
    response.status(200).json(team)
  })
  //If the request includes the id for a team that doesn't exist in the database, a 404 not found error is return along with the message in a JSON format.
  .catch((error) => {
    response.status(404).json('Could not find that team.')
  })
});

//This endpoint returns a specific player based on an id.
app.get('/api/v1/players/:id', (request, response) => {
  //The id is pulled out of the request parameters and destructured.
  const { id } = request.params;
  //This connects to the players database.
  database('players')
  .select()
  //This selects the player in the database where the id matches the destructured id on line 82.
  .where({ id })
  //If the request is successful, a 200-level response code is sent and the player is returned in a JSON format.
  .then((player) => {
    response.status(200).json(player)
  })
  //If the request includes the id of a player that doesn't exist, a 404 not found error is returned along with the message in a JSON format.
  .catch((error) => {
    response.status(404).json('Could not find that player.')
  })
});

//This endpoint allows a user to create a new team.
app.post('/api/v1/teams', (request, response) => {
  //This creates an object based on the body of the request.
  const team = request.body;
  //This creates the required parameters necessary to create a new team in the teams database.
  for (let requiredParameter of [
    'name',
    'head_coach',
    'city',
    'state'
  ]) {
    //If one of the required parameters is not present in the request body, a 422 unprocessable entity request is return along with a message that specifies the required format and the parameter that the request is missing.
    if (!team[requiredParameter]) {
      return response
      .status(422)
      .send({ error: `Expected format: { name: <string> head_coach: <string> city: <string> state: <string>  }. You're missing a "${requiredParameter}" property.` });
    }
  }
  //This connects to the teams database, and inserts the new team object and returns the id column.
  database('teams').insert(team, 'id')
  //If the request is successful, a 201 created status code is returned along with the id of the created team.
  .then((team) => {
      response.status(201).json({ id: team[0] })
    })
    //If there is a server error, a 500 level error is returned along with the error in a JSON format.
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//This endpoint allows a user to create a new player.
app.post('/api/v1/players', (request, response) => {
  //This creates an object based on the request body.
  const player = request.body;
  //This creates the required parameters necessary to create a new player in the players database.
  for (let requiredParameter of [
    'name',
    'pos',
    'totalPoints',
    'team_id'
  ]) {
    //If one of the required parameters is not present in the request body, a 422 unprocessable entity request is return along with a message that specifies the required format and the parameter that the request is missing.
    if (!player[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <string> pos: <string> totalPoints: <string> team_id: <string>  }. You're missing a "${requiredParameter}" property.` });
    }
  }

  //If the request is successful, a 201 created status code is returned along with the id of the created player.
  database('players').insert(player, 'id')
    .then((player) => {
      response.status(201).json({ id: player[0] })
    })
    //If there is a server error, a 500 level error is returned along with the error in a JSON format.
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//This endpoint allows a user to delete a specified player based on an id.
app.delete('/api/v1/players/:id', (req, res) => {

  //The id is pulled out of the request parameters and destructured.
  const { id } = req.params;
  //This connects to the players database.
  database('players')
    .select()
    //This selects the row where the id matches the destructured id on line 162.
    .where({ id: id })
    //This deletes the row where the id matches the destructured id on line 162.
    .del()
    //If the deletion is successful, a 204 deleted resposnse code is returned along with the message in a JSON format.
    .then(() => res.status(204).json('Successfully deleted player'))
    //If there is a server error during the request, a 500-level error is returned along with the message in a JSON format.
    .catch(error =>
      res.status(500).json('Cannot remove player at this time')
    )
  }
);