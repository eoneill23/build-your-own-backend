exports.up = function(knex) {
  return knex.schema.table('players', (table) => {
    table.integer('team_id').unsigned()
    table.foreign('team_id').references('teams.id')
  })
};

exports.down = function(knex) {
  return knex.schema.table('players', (table) => {
    table.dropColumn('team_id');
  })
};
