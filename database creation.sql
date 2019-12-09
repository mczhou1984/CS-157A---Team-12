-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema budgeteddb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema budgeteddb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `budgeteddb` DEFAULT CHARACTER SET utf8 ;
USE `budgeteddb` ;

-- -----------------------------------------------------
-- Table `budgeteddb`.`accounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgeteddb`.`accounts` (
  `accountID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  `budgetID` INT,
  PRIMARY KEY (`accountID`), FOREIGN KEY (`budgetID`) REFERENCES budget (`budgetID`))

ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `budgeteddb`.`budget`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgeteddb`.`budget` (
  `budgetID` INT NOT NULL AUTO_INCREMENT,
  `balance` DOUBLE NOT NULL,
  `daily_budget` DOUBLE NOT NULL,
  `savingPercentage` DOUBLE NOT NULL,
  `date` DATE,
  PRIMARY KEY (`budgetID`))


ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `budgeteddb`.`transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgeteddb`.`transactions` (
  `transactionID` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  `trans_date` DATE NULL,
  `amount` DOUBLE NULL,
  PRIMARY KEY (`transactionID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `budgeteddb`.`income`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgeteddb`.`income` (
  `incomeID` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  `amount` DOUBLE NULL,
  `budgetID` INT,
  PRIMARY KEY (`incomeID`),
  FOREIGN KEY (`budgetID`) REFERENCES budget (budgetID))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `budgeteddb`.`expenses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgeteddb`.`expenses` (
  `expenseID` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NULL,
  `amount` DOUBLE NULL,
  `budgetID` INT,
  PRIMARY KEY (`expenseID`),
  FOREIGN KEY (`budgetID`) REFERENCES budget (budgetID))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `budgeteddb`.`analysis`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgeteddb`.`analysis` (
  `analysisID` INT NOT NULL AUTO_INCREMENT,
  `analysis_date` DATE NOT NULL,
  `surplus` DOUBLE NULL,
  PRIMARY KEY (`analysisID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `budgeteddb`.`transactions_budget`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgeteddb`.`transactions_budget` (
  `transactionID` INT NOT NULL,
  `budgetID` INT NOT NULL,
  PRIMARY KEY (`transactionID`, `budgetID`),
  INDEX `fk_transactions_has_budget_budget1_idx` (`budgetID` ASC) VISIBLE,
  INDEX `fk_transactions_has_budget_transactions1_idx` (`transactionID` ASC) VISIBLE,
  CONSTRAINT `fk_transactions_has_budget_transactions1`
    FOREIGN KEY (`transactionID`)
    REFERENCES `budgeteddb`.`transactions` (`transactionID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_transactions_has_budget_budget1`
    FOREIGN KEY (`budgetID`)
    REFERENCES `budgeteddb`.`budget` (`budgetID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;





CREATE TABLE IF NOT EXISTS `budgeteddb`.`frequent_expenses`(
	`frequent_expensesID` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(45) NULL,
    `accountID` INT NOT NULL,
	FOREIGN KEY (`accountID`)
    REFERENCES `budgeteddb`.`accounts` (`accountID`),
    PRIMARY KEY (`frequent_expensesID`)
    
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `budgeteddb`.`budget_analysis` (
  `budgetID` INT NOT NULL,
  `analysisID` INT NOT NULL,
  PRIMARY KEY (`budgetID`, `analysisID`),
  INDEX `fk_budget_has_analysis_analysis1_idx` (`analysisID` ASC) VISIBLE,
  INDEX `fk_budget_has_analysis_budget1_idx` (`budgetID` ASC) VISIBLE,
  CONSTRAINT `fk_budget_has_analysis_budget1`
    FOREIGN KEY (`budgetID`)
    REFERENCES `budgeteddb`.`budget` (`budgetID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_budget_has_analysis_analysis1`
    FOREIGN KEY (`analysisID`)
    REFERENCES `budgeteddb`.`analysis` (`analysisID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `budgeteddb`.`account_transactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `budgeteddb`.`account_transactions` (
  `accountID` INT NOT NULL,
  `transactionID` INT NOT NULL,
  INDEX `fk_table2_accounts1_idx` (`accountID` ASC) VISIBLE,
  INDEX `fk_table2_transactions1_idx` (`transactionID` ASC) VISIBLE)

ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;