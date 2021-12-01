CREATE TABLE IF NOT EXISTS matchs (
  id INTEGER PRIMARY KEY,
  player1 INTEGER NOT NULL,
  player2 INTEGER,
  pokemons_player1 VARCHAR(255),
  pokemons_player2 VARCHAR(255),
  status VARCHAR(128) NOT NULL DEFAULT 'created',
  winner INTEGER
)
