-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `Task`;
DROP TABLE IF EXISTS `TaskList`;
DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
	`id` INT AUTO_INCREMENT,
	`sub` VARCHAR(191) NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE `TaskList` (
	`id` INT AUTO_INCREMENT,
	`title` VARCHAR(191) NOT NULL,
	`createdAt` DATETIME NOT NULL,
	`userId` INT NOT NULL,
	FOREIGN KEY(`userId`) REFERENCES `User`(`id`),
	PRIMARY KEY(`id`)
);

CREATE TABLE `Task` (
	`id` INT AUTO_INCREMENT,
	`title` VARCHAR(191) NOT NULL,
	`description` VARCHAR(191) NOT NULL,
	`dueDate` VARCHAR(191),
	`startTime` VARCHAR(191),
	`endTime` VARCHAR(191),
	`reminder` VARCHAR(191),
	`priority` VARCHAR(191) NOT NULL,
	`label` VARCHAR(191) NOT NULL,
	`status` VARCHAR(191) NOT NULL,
	`tasklistId` INT NOT NULL,
	FOREIGN KEY(`tasklistId`) REFERENCES `TaskList`(`id`),
	PRIMARY KEY(`id`)
);


