exports.up = function(knex) {
  return Promise.all([
    knex.schema.table('teams', (table) => {
      table.string('state')
    }),

    knex.schema.table('players', (table) => {
      table.dropColumn('pointsScored')
      table.string('totalPoints')
    })
  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.table('teams', (table) => {
      table.dropColumn('state')
    }),

    knex.schema.table('players', (table) => {
      table.integer('pointsScored')
      table.dropColumn('totalPoints')
    })
  ])
};
