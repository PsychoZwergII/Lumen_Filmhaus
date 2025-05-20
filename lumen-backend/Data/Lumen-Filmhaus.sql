


USE lumenfilmhaus

CREATE TABLE IF NOT EXISTS Filme (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  FilmName VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Datum (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  DatumUhrzeit DATETIME NOT NULL,
  FilmId INT NOT NULL,
  FOREIGN KEY (FilmId) REFERENCES Filme(Id)
);

CREATE TABLE IF NOT EXISTS Reservation (
  Id INT AUTO_INCREMENT PRIMARY KEY,
  FilmId INT NOT NULL,
  VorstellungId INT NOT NULL,
  Sitzplaetze VARCHAR(255) NOT NULL,
  Name VARCHAR(100) NOT NULL,
  Email VARCHAR(100) NOT NULL,
  FOREIGN KEY (FilmId) REFERENCES Filme(Id),
  FOREIGN KEY (VorstellungId) REFERENCES Datum(Id)
);






INSERT INTO Filme (id, FilmName) VALUES
  (1, 'The Shawshank Redemption'),
  (2, 'The Godfather'),
  (3, 'The Dark Knight'),
  (4, 'Pulp Fiction'),
  (5, 'Schindler''s List'),
  (6, 'Inception'),
  (7, 'Fight Club'),
  (8, 'Forrest Gump'),
  (9, 'The Matrix'),
  (10, 'Interstellar');
  
  
  INSERT INTO Datum (DatumUhrzeit, FilmId) VALUES
  -- 2025-05-20: 3 Filme
  ('2025-05-20 18:00:00', 1),
  ('2025-05-20 20:30:00', 2),
  ('2025-05-20 22:00:00', 3),
  
  -- 2025-05-21: 2 Filme
  ('2025-05-21 17:00:00', 4),
  ('2025-05-21 19:30:00', 5),
  
  -- 2025-05-22: 3 Filme
  ('2025-05-22 18:00:00', 6),
  ('2025-05-22 20:30:00', 7),
  ('2025-05-22 22:00:00', 8),
  
  -- 2025-05-23: 2 Filme
  ('2025-05-23 17:00:00', 9),
  ('2025-05-23 19:30:00', 10),
  
  -- 2025-05-24: 3 Filme
  ('2025-05-24 18:00:00', 1),
  ('2025-05-24 20:30:00', 4),
  ('2025-05-24 22:00:00', 7),
  
  -- 2025-05-25: 2 Filme
  ('2025-05-25 19:00:00', 2),
  ('2025-05-25 21:30:00', 5);
  
  INSERT INTO Reservation (FilmId, VorstellungId, Sitzplaetze, Name, Email) VALUES
  (1,  1, 'A1,A2', 'Alice Müller',   'alice@example.com'),
  (1,  1, 'B1',    'Bob Schmidt',     'bob@example.com'),
  (2,  2, 'C3,C4', 'Carla Meier',     'carla@example.com'),
  (2,  2, 'A5',    'David Klein',     'david@example.com'),
  (3,  3, 'D1,D2', 'Eva Schulz',      'eva@example.com'),
  (4,  4, 'A1',    'Frank Bauer',     'frank@example.com'),
  (5,  5, 'B2,B3', 'Gabi Richter',    'gabi@example.com'),
  (6,  6, 'C1',    'Hans Wagner',     'hans@example.com'),
  (7,  7, 'A2,A3', 'Inge Weber',      'inge@example.com'),
  (8,  8, 'D4',    'Jörg Neumann',    'joerg@example.com'),
  (9,  9, 'B4,B5', 'Klara Hoffmann',  'klara@example.com'),
  (10, 10, 'C2',   'Lukas Becker',    'lukas@example.com'),
  (1, 11, 'A1,A3', 'Maria König',     'maria@example.com'),
  (4, 12, 'B1',    'Niko Frank',      'niko@example.com'),
  (7, 13, 'D2,D3', 'Olaf Peters',     'olaf@example.com');

  
SELECT
  d.Id,
  d.DatumUhrzeit,
  f.FilmName AS Film
FROM vorstellungen AS d
INNER JOIN Filme AS f
  ON d.FilmId = f.Id;
  
  
SELECT 
  r.Id,
  r.VorstellungId,
  d.DatumUhrzeit,
  f.FilmName    AS Film,
  r.Sitzplaetze,
  r.Name,
  r.Email
FROM Reservationen AS r
INNER JOIN vorstellungen AS d
  ON r.VorstellungId = d.Id
INNER JOIN Filme AS f
  ON r.FilmId = f.Id;

SELECT * FROM Filme
