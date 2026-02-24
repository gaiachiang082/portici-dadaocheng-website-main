CREATE TABLE `newsletter_subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(256),
	`language` varchar(8) DEFAULT 'it',
	`source` varchar(64) DEFAULT 'website',
	`isActive` boolean NOT NULL DEFAULT true,
	`welcomeSentAt` timestamp,
	`unsubscribedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsletter_subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletter_subscribers_email_unique` UNIQUE(`email`)
);
