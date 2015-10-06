DROP DATABASE IF EXISTS gooseEggs;

CREATE DATABASE gooseEggs;

USE gooseEggs;

DROP TABLE IF EXISTS gameTable;
DROP TABLE IF EXISTS nodeInfo;
DROP TABLE IF EXISTS playerContact;

/*****GAME ID******/
CREATE TABLE gameInfo (
  gameId INT NOT NULL AUTO_INCREMENT,
  gameName VARCHAR(20) NOT NULL,
  description VARCHAR(50),
  createdDate VARCHAR(10),
  avgRating DECIMAL(2,1),
  numOfRatings int(5),

  PRIMARY KEY(gameId)
);

/*****TABLE TREASURE INFO******/

CREATE TABLE nodeInfo (
  gameId INT,
  nodeId INT(3),
  image VARCHAR(80),
  lat DECIMAL(10,7),
  lon DECIMAL(10,7),
  clue VARCHAR(140),


  FOREIGN KEY (gameId) REFERENCES gameInfo(gameId)
);

/*****PLAYER CONTACT******/

CREATE TABLE userInfo (
  userName VARCHAR(20),
  password VARCHAR(100),
  
  PRIMARY KEY(userName)
);