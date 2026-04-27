CREATE DATABASE IF NOT EXISTS supergps DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

use supergps;

-- DROP TABLE IF EXISTS perfil;
CREATE TABLE perfil (
  id int NOT NULL,
  nome varchar(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nome_UN (nome)
);

-- Manter sincronizado com enums/perfil.ts e models/perfil.ts
INSERT INTO perfil (id, nome) VALUES (1, 'Administrador'), (2, 'Comum');

-- DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL,
  nome varchar(100) NOT NULL,
  idperfil int NOT NULL,
  token char(32) DEFAULT NULL,
  exclusao datetime NULL,
  criacao datetime NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY usuario_email_UN (email),
  KEY usuario_exclusao_IX (exclusao),
  KEY usuario_idperfil_FK_IX (idperfil),
  CONSTRAINT usuario_idperfil_FK FOREIGN KEY (idperfil) REFERENCES perfil (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

INSERT INTO usuario (email, nome, idperfil, token, criacao) VALUES ('admin@espm.br', 'Administrador', 1, NULL, NOW());

-- DROP TABLE IF EXISTS van;
CREATE TABLE van (
  id int NOT NULL AUTO_INCREMENT,
  apelido varchar(100) NOT NULL,
  placa varchar(15) NOT NULL,
  modelo varchar(100) NOT NULL,
  capacidade int NOT NULL,
  senha varchar(45) NULL,
  exclusao datetime NULL,
  criacao datetime NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY van_placa_UN (placa),
  KEY van_exclusao_IX (exclusao)
);

-- DROP TABLE IF EXISTS log;
CREATE TABLE log (
  id bigint NOT NULL AUTO_INCREMENT,
  idvan int NOT NULL,
  latitude float NOT NULL,
  longitude float NOT NULL,
  data datetime NOT NULL,
  PRIMARY KEY (id),
  KEY log_idvan_FK_IX (idvan ASC, data DESC),
  CONSTRAINT log_idvan_FK FOREIGN KEY (idvan) REFERENCES van (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);
