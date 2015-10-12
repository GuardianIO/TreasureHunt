DROP DATABASE IF EXISTS gooseEggs;

CREATE DATABASE gooseEggs;

USE gooseEggs;

DROP TABLE IF EXISTS gameInfo;
DROP TABLE IF EXISTS nodeInfo;
DROP TABLE IF EXISTS userInfo;
DROP TABLE IF EXISTS nodePics;

/*****GAME INFO******/
CREATE TABLE gameInfo (
  gameId INT NOT NULL AUTO_INCREMENT,
  gameName VARCHAR(20) NOT NULL,
  description VARCHAR(500),
  createdDate BIGINT,
  createdBy VARCHAR(20),
  avgRating DECIMAL(2,1),
  numOfRatings INT(5),
  private BOOLEAN,

  PRIMARY KEY(gameId)
);

/*****NODE INFO******/

CREATE TABLE nodeInfo (
  gameId INT,
  nodeId INT(3),
  image VARCHAR(80),
  lat DECIMAL(10,7),
  lon DECIMAL(10,7),
  clue VARCHAR(140),


  FOREIGN KEY (gameId) REFERENCES gameInfo(gameId)
);

/*****USER INFO******/

CREATE TABLE userInfo (
  userName VARCHAR(20),
  password VARCHAR(100),
  macadamia INT,
  
  PRIMARY KEY(userName)
);

/*****NODE PICS******/
CREATE TABLE nodePics (
  gameId INT,
  nodeId INT(3),
  image VARCHAR(80),
  comment VARCHAR(140),
  uploadedTime BIGINT,
  userName VARCHAR(20),
  FOREIGN KEY (gameId) REFERENCES gameInfo(gameId),
  FOREIGN KEY (userName) REFERENCES userInfo(userName)
);