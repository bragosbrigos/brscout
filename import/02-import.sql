-- Import players with generated stats based on position
COPY player_stats_temp (name, team_name, number, nation, position, age)
FROM '/docker-entrypoint-initdb.d/player_stats.csv'
WITH (FORMAT csv, HEADER true, DELIMITER ';');

-- Insert with generated rating, goals, and assists based on position
INSERT INTO player_stats (name, team_name, number, nation, position, age, rating, goals, assists)
SELECT 
    name,
    team_name,
    number,
    nation,
    position,
    age,
    -- Rating based on position
    CASE 
        WHEN LOWER(position) LIKE '%atac%' OR LOWER(position) LIKE '%forward%' OR LOWER(position) LIKE '%striker%' 
            THEN FLOOR(75 + RANDOM() * 20)::INTEGER
        WHEN LOWER(position) LIKE '%meio%' OR LOWER(position) LIKE '%midfield%' 
            THEN FLOOR(70 + RANDOM() * 25)::INTEGER
        WHEN LOWER(position) LIKE '%defes%' OR LOWER(position) LIKE '%defender%' OR LOWER(position) LIKE '%back%' 
            THEN FLOOR(68 + RANDOM() * 24)::INTEGER
        WHEN LOWER(position) LIKE '%goleir%' OR LOWER(position) LIKE '%goalkeeper%' OR LOWER(position) LIKE '%keeper%' 
            THEN FLOOR(65 + RANDOM() * 30)::INTEGER
        ELSE FLOOR(60 + RANDOM() * 35)::INTEGER
    END as rating,
    -- Goals based on position
    CASE 
        WHEN LOWER(position) LIKE '%atac%' OR LOWER(position) LIKE '%forward%' OR LOWER(position) LIKE '%striker%' 
            THEN FLOOR(RANDOM() * 30)::INTEGER
        WHEN LOWER(position) LIKE '%meio%' OR LOWER(position) LIKE '%midfield%' 
            THEN FLOOR(RANDOM() * 15)::INTEGER
        ELSE FLOOR(RANDOM() * 5)::INTEGER
    END as goals,
    -- Assists based on position
    CASE 
        WHEN LOWER(position) LIKE '%meio%' OR LOWER(position) LIKE '%midfield%' OR LOWER(position) LIKE '%wing%' 
            THEN FLOOR(RANDOM() * 20)::INTEGER
        WHEN LOWER(position) LIKE '%atac%' OR LOWER(position) LIKE '%forward%' 
            THEN FLOOR(RANDOM() * 15)::INTEGER
        ELSE FLOOR(RANDOM() * 8)::INTEGER
    END as assists
FROM player_stats_temp;

DROP TABLE player_stats_temp;