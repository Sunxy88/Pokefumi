CREATE TABLE IF NOT EXISTS matchs (
  id INTEGER PRIMARY KEY,
  player1 INTEGER NOT NULL,
  player2 INTEGER,
  pokemons_player1 VARCHAR(256),
  pokemons_player2 VARCHAR(256),
  round_winner_id VARCHAR(1024),
  status VARCHAR(16) NOT NULL DEFAULT 'created',
  winner INTEGER
)
