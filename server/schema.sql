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

  PRIMARY KEY(gameId)
);

/*****TABLE TREASURE INFO******/

CREATE TABLE treasureInfo (
  imageFileName INT NOT NULL AUTO_INCREMENT,
  gameId INT,
  timelineKey INT(3),
  geolocation VARCHAR(20) NOT NULL,
  hint VARCHAR(50),

  PRIMARY KEY (imageFileName),
  FOREIGN KEY (gameId) REFERENCES gameTable(gameId)
);

/*****PLAYER CONTACT******/

CREATE TABLE playerContact (
  gameId INT,
  email VARCHAR(20),
  FOREIGN KEY (gameId) REFERENCES gameTable(gameId)
);