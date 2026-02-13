CREATE TABLE `analytics_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`eventType` varchar(255) NOT NULL,
	`eventData` json NOT NULL DEFAULT ('{}'),
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analytics_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `brand_identities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`brandName` varchar(255) NOT NULL,
	`tagline` text,
	`colors` json NOT NULL DEFAULT ('{}'),
	`voiceAndTone` text,
	`targetAudience` text,
	`logoUrl` varchar(512),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `brand_identities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ecosystems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`isActive` boolean NOT NULL DEFAULT false,
	`color` varchar(7),
	`icon` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ecosystems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `integrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('zapier','make','webhook','custom') NOT NULL,
	`webhookUrl` varchar(512),
	`apiKey` varchar(512),
	`isActive` boolean NOT NULL DEFAULT true,
	`lastSyncAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `integrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `learning_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`completedCourses` json NOT NULL DEFAULT ('[]'),
	`currentCourse` varchar(255),
	`badges` json NOT NULL DEFAULT ('[]'),
	`totalHoursLearned` decimal(8,2) NOT NULL DEFAULT '0',
	`lastActivityAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learning_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `monetization_data` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`activeStreams` json NOT NULL DEFAULT ('[]'),
	`monthlyRevenue` decimal(12,2) NOT NULL DEFAULT '0',
	`projectedRevenue` decimal(12,2) NOT NULL DEFAULT '0',
	`totalRevenue` decimal(12,2) NOT NULL DEFAULT '0',
	`customers` int DEFAULT 0,
	`conversionRate` decimal(5,2) NOT NULL DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `monetization_data_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scheduled_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`scheduledTime` timestamp NOT NULL,
	`platforms` json NOT NULL DEFAULT ('[]'),
	`status` enum('scheduled','published','failed') NOT NULL DEFAULT 'scheduled',
	`psychologyScore` int NOT NULL DEFAULT 0,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `scheduled_posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `spiritual_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`coreValues` json NOT NULL DEFAULT ('[]'),
	`purposeStatement` text,
	`alignmentScore` int DEFAULT 0,
	`lastCheckIn` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `spiritual_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`duration` enum('1_min','3_min') NOT NULL,
	`status` enum('draft','processing','completed','failed') NOT NULL DEFAULT 'draft',
	`script` text NOT NULL,
	`videoUrl` varchar(512),
	`thumbnailUrl` varchar(512),
	`klingVideoId` varchar(255),
	`style` enum('professional','creative','minimal') NOT NULL DEFAULT 'professional',
	`voiceover` enum('male','female','narrator') NOT NULL DEFAULT 'narrator',
	`views` int DEFAULT 0,
	`engagementScore` decimal(5,2) DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `videos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workflows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`status` enum('active','completed','paused') NOT NULL DEFAULT 'active',
	`dependencies` json NOT NULL DEFAULT ('[]'),
	`priority` enum('low','medium','high') NOT NULL DEFAULT 'medium',
	`dueDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`completedAt` timestamp,
	CONSTRAINT `workflows_id` PRIMARY KEY(`id`)
);
