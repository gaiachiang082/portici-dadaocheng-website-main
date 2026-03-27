CREATE TABLE `program_interests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(256),
	`topicSlug` varchar(128) NOT NULL,
	`topicTitle` varchar(256) NOT NULL,
	`note` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `program_interests_id` PRIMARY KEY(`id`)
);
