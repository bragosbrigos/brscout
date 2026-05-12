DROP TABLE IF EXISTS player_stats CASCADE;

CREATE TABLE player_stats (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    team_name VARCHAR(255),
    number INTEGER,
    nation VARCHAR(255),
    position VARCHAR(255),
    age INTEGER,
    rating INTEGER,
    goals INTEGER,
    assists INTEGER
);