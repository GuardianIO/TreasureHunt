DROP DATABASE IF EXISTS fileDealer_db;

CREATE DATABASE fileDealer_db;

USE fileDealer_db;

DROP TABLE IF EXISTS treasureInfo;

/*****GAME ID******/
CREATE TABLE gameTable(
  gameId INT NOT NULL AUTO_INCREMENT,
  game_name VARCHAR(20) NOT NULL
  -- Potentially will store username if we have the authetication
  -- username VARCHAR(20) NOT NULL 
);

/*****TABLE TREASURE INFO******/

CREATE TABLE treasureInfo (
  gameId INT,
  imageFileName INT NOT NULL AUTO_INCREMENT,
  timelineKey INT(3),
  geolocation VARCHAR(20) NOT NULL,
  hint VARCHAR(50)
);

/*****PLAYER CONTACT******/

CREATE TABLE playerContact (
  gameId INT,
  email VARCHAR(20)
);