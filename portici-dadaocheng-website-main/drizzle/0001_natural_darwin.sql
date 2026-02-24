CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` int NOT NULL,
	`workshopId` int NOT NULL,
	`guestName` varchar(256) NOT NULL,
	`guestEmail` varchar(320) NOT NULL,
	`guestPhone` varchar(64),
	`guestCountry` varchar(128),
	`participants` int NOT NULL DEFAULT 1,
	`notes` text,
	`totalAmountEur` decimal(10,2) NOT NULL,
	`depositAmountEur` decimal(10,2) NOT NULL,
	`balanceAmountEur` decimal(10,2) NOT NULL,
	`stripePaymentIntentId` varchar(256),
	`stripeCheckoutSessionId` varchar(256),
	`paymentStatus` enum('pending','deposit_paid','fully_paid','refunded','cancelled') NOT NULL DEFAULT 'pending',
	`depositPaidAt` timestamp,
	`balancePaidAt` timestamp,
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
	`confirmationCode` varchar(32),
	`cancelledAt` timestamp,
	`cancellationReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`),
	CONSTRAINT `bookings_confirmationCode_unique` UNIQUE(`confirmationCode`)
);
--> statement-breakpoint
CREATE TABLE `workshop_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`workshopId` int NOT NULL,
	`sessionDate` timestamp NOT NULL,
	`spotsTotal` int NOT NULL DEFAULT 12,
	`spotsBooked` int NOT NULL DEFAULT 0,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `workshop_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workshops` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(128) NOT NULL,
	`title` varchar(256) NOT NULL,
	`titleZh` varchar(256),
	`category` varchar(64) NOT NULL,
	`description` text,
	`descriptionZh` text,
	`durationMinutes` int DEFAULT 120,
	`maxParticipants` int DEFAULT 12,
	`priceEur` decimal(10,2) NOT NULL,
	`depositPercent` int DEFAULT 50,
	`location` varchar(256),
	`imageUrl` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `workshops_id` PRIMARY KEY(`id`),
	CONSTRAINT `workshops_slug_unique` UNIQUE(`slug`)
);
