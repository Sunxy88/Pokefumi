CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY,
  login_id TEXT NOT NULL,
  passwd VARCHAR(64) NOT NULL,
  name	TEXT NOT NULL,
  score   INTEGER DEFAULT 0
)
