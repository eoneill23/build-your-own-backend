exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('teams', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('head_coach');
      table.string('city');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('players', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('pos');
      table.integer('pointsScored');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable('teams'),
    knex.schema.dropTable('players')
  ])
};