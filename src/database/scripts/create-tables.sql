CREATE TABLE `highlights` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` integer,
  `created_at` timestamp NOT NULL,
  `ended_at` timestamp,
  `is_completed` varchar(1) DEFAULT 0,
  `event_id` integer
);

CREATE TABLE `highlight_tasks` (
  `highlight_id` integer,
  `task_id` integer,
  PRIMARY KEY (`highlight_id`, `task_id`)
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `sub` varchar(512) UNIQUE
);

CREATE TABLE `tasks` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `task_list_id` integer,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `task_lists` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL
);

CREATE TABLE `events` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `calendar_id` integer,
  `name` varchar(255) NOT NULL,
  `start_at` timestamp,
  `end_at` timestamp
);

CREATE TABLE `calendars` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `name` varchar(255) NOT NULL
);


CREATE TABLE `timer_details` (
  `timer_id` integer PRIMARY KEY AUTO_INCREMENT,
    `timer_name` VARCHAR(255) NOT NULL,
  `pomo_duration` TIME,
  `short_break_duration` TIME,
  `long_break_duration` TIME,
  `pomos_per_long_break` INT NOT NULL,
  `user_id` INTEGER NOT NULL
);

CREATE TABLE `hilights_hasintha` (
  `highlight_id` integer,
  `highlight_name`VARCHAR(255) NOT NULL,
  `user_id` INTEGER NOT NULL
);

CREATE TABLE `HighlightPomoDetails` (
  `timer_id` INTEGER,
  `highlight_id` VARCHAR(255) NOT NULL,
  `pomo_duration` TIME DEFAULT '00:00:00',
  `short_break_duration` TIME DEFAULT '00:00:00',
  `long_break_duration` TIME DEFAULT '00:00:00',
  `pomos_per_long_break` INTEGER,
  `user_id` INTEGER NOT NULL
);


  

ALTER TABLE `highlights` ADD FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

ALTER TABLE `highlight_tasks` ADD FOREIGN KEY (`highlight_id`) REFERENCES `highlights` (`id`);

ALTER TABLE `highlight_tasks` ADD FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`task_list_id`) REFERENCES `task_lists` (`id`);

ALTER TABLE `task_lists` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `events` ADD FOREIGN KEY (`calendar_id`) REFERENCES `calendars` (`id`);

ALTER TABLE `calendars` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `timer_details` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
