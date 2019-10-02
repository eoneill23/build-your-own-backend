module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/fantasy_football_tracker',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};