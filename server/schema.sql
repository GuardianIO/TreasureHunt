DROP DATABASE IF EXISTS fileDealer_db;

CREATE DATABASE fileDealer_db;

USE fileDealer_db;

DROP TABLE IF EXISTS gameTable;
DROP TABLE IF EXISTS treasureInfo;
DROP TABLE IF EXISTS playerContact;

/*****GAME ID******/
CREATE TABLE gameTable(
  gameId INT NOT NULL AUTO_INCREMENT,
  game_name VARCHAR(20) NOT NULL,
  description VARCHAR(50),
  created_date VARCHAR(10),

  PRIMARY KEY(gameId)
);

/*****TABLE TREASURE INFO******/

CREATE TABLE treasureInfo (
  gameId INT,
  nodeId INT(3),
  image VARCHAR(20),
  lat DECIMAL(10,7),
  lon DECIMAL(10,7),
  clue VARCHAR(140),

  FOREIGN KEY (gameId) REFERENCES gameTable(gameId)
);

/*****PLAYER CONTACT******/

CREATE TABLE playerContact (
  gameId INT,
  email VARCHAR(20),
  FOREIGN KEY (gameId) REFERENCES gameTable(gameId)
);