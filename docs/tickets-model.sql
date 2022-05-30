-- MySQL Script generated by MySQL Workbench
-- Mon May 30 13:24:00 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ticketsDb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ticketsDb` ;

-- -----------------------------------------------------
-- Schema ticketsDb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ticketsDb` DEFAULT CHARACTER SET utf8 ;
USE `ticketsDb` ;

-- -----------------------------------------------------
-- Table `ticketsDb`.`userTypes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`userTypes` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`userTypes` (
  `idUserType` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userType` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idUserType`),
  UNIQUE INDEX `idUserType_UNIQUE` (`idUserType` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`users` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`users` (
  `idUser` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `fkUserType` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `idUser_UNIQUE` (`idUser` ASC) VISIBLE,
  INDEX `fkuserTypesidx` (`fkUserType` ASC) VISIBLE,
  CONSTRAINT `fkuserTypes`
    FOREIGN KEY (`fkUserType`)
    REFERENCES `ticketsDb`.`userTypes` (`idUserType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`roles`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`roles` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`roles` (
  `idRole` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameRole` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idRole`),
  UNIQUE INDEX `idRole_UNIQUE` (`idRole` ASC) VISIBLE,
  UNIQUE INDEX `nameRole_UNIQUE` (`nameRole` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`employes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`employes` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`employes` (
  `idemploye` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(15) NOT NULL,
  `nameEmploye` VARCHAR(50) NOT NULL,
  `emailEmploye` VARCHAR(40) NOT NULL,
  `numberEmploye` VARCHAR(10) NOT NULL,
  `passwordEmploye` VARCHAR(70) NOT NULL,
  `fkUser` INT UNSIGNED NOT NULL,
  `fkRole` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idemploye`),
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE,
  UNIQUE INDEX `nameEmploye_UNIQUE` (`nameEmploye` ASC) VISIBLE,
  UNIQUE INDEX `numberEmploye_UNIQUE` (`numberEmploye` ASC) VISIBLE,
  INDEX `fk_employes_users1_idx` (`fkUser` ASC) VISIBLE,
  INDEX `fk_employes_roles1_idx` (`fkRole` ASC) VISIBLE,
  CONSTRAINT `fk_employes_users1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `ticketsDb`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_employes_roles1`
    FOREIGN KEY (`fkRole`)
    REFERENCES `ticketsDb`.`roles` (`idRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`consumers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`consumers` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`consumers` (
  `idConsumer` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameConsumer` VARCHAR(50) NOT NULL,
  `emailConsumer` VARCHAR(40) NOT NULL,
  `fkUser` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idConsumer`),
  UNIQUE INDEX `idConsumer_UNIQUE` (`idConsumer` ASC) VISIBLE,
  UNIQUE INDEX `nameConsumer_UNIQUE` (`nameConsumer` ASC) VISIBLE,
  UNIQUE INDEX `emailConsumer_UNIQUE` (`emailConsumer` ASC) VISIBLE,
  INDEX `fk_consumers_users1_idx` (`fkUser` ASC) VISIBLE,
  CONSTRAINT `fk_consumers_users1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `ticketsDb`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`computers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`computers` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`computers` (
  `idComputer` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `serialNumber` VARCHAR(20) NOT NULL,
  `fkEmploye` INT NOT NULL,
  PRIMARY KEY (`idComputer`),
  INDEX `fk_computers_employes1_idx` (`fkEmploye` ASC) VISIBLE,
  CONSTRAINT `fk_computers_employes1`
    FOREIGN KEY (`fkEmploye`)
    REFERENCES `ticketsDb`.`employes` (`idemploye`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`phones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`phones` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`phones` (
  `idphone` INT NOT NULL AUTO_INCREMENT,
  `countryCode` INT NOT NULL,
  `numberPhone` VARCHAR(10) NOT NULL,
  `typeNumbre` ENUM('Fijo', 'Celular') NOT NULL,
  `fkUSer` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idphone`),
  INDEX `fk_phones_users1_idx` (`fkUSer` ASC) VISIBLE,
  CONSTRAINT `fk_phones_users1`
    FOREIGN KEY (`fkUSer`)
    REFERENCES `ticketsDb`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`area`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`area` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`area` (
  `idArea` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nameArea` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idArea`),
  UNIQUE INDEX `nameArea_UNIQUE` (`nameArea` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`agents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`agents` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`agents` (
  `idAgent` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `principalAgent` INT NOT NULL DEFAULT 0,
  `fkEmploye` INT NOT NULL,
  `fkArea` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idAgent`),
  INDEX `fk_agents_employes1_idx` (`fkEmploye` ASC) VISIBLE,
  INDEX `fk_agents_area1_idx` (`fkArea` ASC) VISIBLE,
  CONSTRAINT `fk_agents_employes1`
    FOREIGN KEY (`fkEmploye`)
    REFERENCES `ticketsDb`.`employes` (`idemploye`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_agents_area1`
    FOREIGN KEY (`fkArea`)
    REFERENCES `ticketsDb`.`area` (`idArea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`category` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`category` (
  `idCategory` INT NOT NULL AUTO_INCREMENT,
  `nameCategory` VARCHAR(20) NOT NULL,
  `Description` TEXT NOT NULL,
  PRIMARY KEY (`idCategory`),
  UNIQUE INDEX `nameCategory_UNIQUE` (`nameCategory` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`tickets`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`tickets` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`tickets` (
  `idTicket` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dateInitial` TIMESTAMP(3) NOT NULL,
  `dateClose` TIMESTAMP(3) NULL,
  `ticketType` INT UNSIGNED NOT NULL DEFAULT 1,
  `titleTicket` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `comments` VARCHAR(30) NOT NULL,
  `fkArea` INT UNSIGNED NOT NULL,
  `fkCategory` INT NOT NULL,
  `fkUser` INT UNSIGNED NOT NULL,
  `fkAgent` INT UNSIGNED NOT NULL,
  `Priority` ENUM('Alta', 'Media', 'Baja') NULL,
  PRIMARY KEY (`idTicket`),
  UNIQUE INDEX `idTicket_UNIQUE` (`idTicket` ASC) VISIBLE,
  INDEX `fk_tickets_area1_idx` (`fkArea` ASC) VISIBLE,
  INDEX `fk_tickets_category1_idx` (`fkCategory` ASC) VISIBLE,
  INDEX `fk_tickets_users1_idx` (`fkUser` ASC) VISIBLE,
  INDEX `fk_tickets_agents1_idx` (`fkAgent` ASC) VISIBLE,
  CONSTRAINT `fk_tickets_area1`
    FOREIGN KEY (`fkArea`)
    REFERENCES `ticketsDb`.`area` (`idArea`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tickets_category1`
    FOREIGN KEY (`fkCategory`)
    REFERENCES `ticketsDb`.`category` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tickets_users1`
    FOREIGN KEY (`fkUser`)
    REFERENCES `ticketsDb`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tickets_agents1`
    FOREIGN KEY (`fkAgent`)
    REFERENCES `ticketsDb`.`agents` (`idAgent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`reassignments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`reassignments` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`reassignments` (
  `idReassignment` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `status` ENUM('Aprobado', 'Rechazado') NOT NULL,
  `comments` TEXT NOT NULL,
  `dateRequest` TIMESTAMP(3) NOT NULL,
  `dateResponse` TIMESTAMP(3) NOT NULL,
  `fkAgentProvider` INT UNSIGNED NOT NULL,
  `fkTicket` INT UNSIGNED NOT NULL,
  `fkAgentReciver` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idReassignment`),
  INDEX `fk_reassignments_agents1_idx` (`fkAgentProvider` ASC) VISIBLE,
  INDEX `fk_reassignments_tickets1_idx` (`fkTicket` ASC) VISIBLE,
  INDEX `fk_reassignments_agents2_idx` (`fkAgentReciver` ASC) VISIBLE,
  CONSTRAINT `fk_reassignments_agents1`
    FOREIGN KEY (`fkAgentProvider`)
    REFERENCES `ticketsDb`.`agents` (`idAgent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reassignments_tickets1`
    FOREIGN KEY (`fkTicket`)
    REFERENCES `ticketsDb`.`tickets` (`idTicket`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reassignments_agents2`
    FOREIGN KEY (`fkAgentReciver`)
    REFERENCES `ticketsDb`.`agents` (`idAgent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`reoppeningTicket`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`reoppeningTicket` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`reoppeningTicket` (
  `idReoppening` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `comments` TEXT NOT NULL,
  `status` ENUM('Aprobado', 'Rechazado') NULL,
  `dateInitial` TIMESTAMP(3) NOT NULL,
  `dateClose` TIMESTAMP(3) NULL,
  `fkTicket` INT UNSIGNED NOT NULL,
  `fkAgent` INT UNSIGNED NOT NULL,
  `fkAdmin` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idReoppening`),
  INDEX `fk_reoppeningTicket_tickets1_idx` (`fkTicket` ASC) VISIBLE,
  INDEX `fk_reoppeningTicket_agents1_idx` (`fkAgent` ASC) VISIBLE,
  INDEX `fk_reoppeningTicket_agents2_idx` (`fkAdmin` ASC) VISIBLE,
  CONSTRAINT `fk_reoppeningTicket_tickets1`
    FOREIGN KEY (`fkTicket`)
    REFERENCES `ticketsDb`.`tickets` (`idTicket`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reoppeningTicket_agents1`
    FOREIGN KEY (`fkAgent`)
    REFERENCES `ticketsDb`.`agents` (`idAgent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reoppeningTicket_agents2`
    FOREIGN KEY (`fkAdmin`)
    REFERENCES `ticketsDb`.`agents` (`idAgent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `ticketsDb`.`baseSolution`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ticketsDb`.`baseSolution` ;

CREATE TABLE IF NOT EXISTS `ticketsDb`.`baseSolution` (
  `idSolution` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `problemTitle` VARCHAR(50) NOT NULL,
  `solution` TEXT NOT NULL,
  `dateInitial` TIMESTAMP(3) NOT NULL,
  `dateUpdate` TIMESTAMP(3) NOT NULL,
  `fkAgent` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`idSolution`),
  UNIQUE INDEX `problemTitle_UNIQUE` (`problemTitle` ASC) VISIBLE,
  INDEX `fk_baseSolution_agents1_idx` (`fkAgent` ASC) VISIBLE,
  CONSTRAINT `fk_baseSolution_agents1`
    FOREIGN KEY (`fkAgent`)
    REFERENCES `ticketsDb`.`agents` (`idAgent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;