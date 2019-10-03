const teamData = require('../../../team_data');

const createTeam = (knex, team) => {
  return knex('teams').insert({
    name: team.name,
    head_coach: team.headCoach,
    city: team.city,
  }, 'id')
    .then(teamId => {
      let playerPromises = [];

      team.players.forEach(player => {
        playerPromises.push(
          createPlayer(knex, {
            name: player.name,
            pos: player.pos,
            pointsScored: Math.floor(player.pointsScored),
            team_id: teamId[0]
          })
        )
      });

      return Promise.all(playerPromises);
    })
};

const createPlayer = (knex, player) => {
  return knex('players').insert(player);
}

exports.seed = (knex) => {
  return knex('teams').del()
    .then(() => knex('players').del())
    .then(() => {
      let teamPromises = [];

      teamData.forEach(team => {
        teamPromises.push(createTeam(knex, team))
      });

      return Promise.all(teamPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
}
