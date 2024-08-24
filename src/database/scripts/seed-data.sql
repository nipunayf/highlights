insert into User(sub) values('6e4096d8-b99e-4b2d-a495-446cce5fcd7c');

insert into TaskList(userId, title, createdAt) 
values(1, 'Shopping', '2023-10-05 14:48:00'),
(1, 'Grocery', '2023-10-05 14:48:00'),
(1, 'Work', '2023-10-05 14:48:00'),
(1, 'Travel', '2023-10-05 14:48:00');


INSERT INTO `Timer` (name, pomoDuration, shortBreakDuration, longBreakDuration, pomosPerLongBreak, userId) 
VALUES 
('Morning Focus', '00:25:00', '00:05:00', '00:15:00', 4, 1),
('Afternoon Session', '00:30:00', '00:10:00', '00:20:00', 3, 1),
('Evening Study', '00:45:00', '00:10:00', '00:25:00', 5, 1),
('Night Work', '01:00:00', '00:15:00', '00:30:00', 2, 1),
('Weekend Marathon', '02:00:00', '00:20:00', '00:45:00', 6, 1);



INSERT INTO `Task` 
(`title`, `description`, `dueDate`, `startTime`, `endTime`, `reminder`, `priority`, `label`, `status`, `tasklistId`) 
VALUES
('Buy Groceries', 'Purchase items for the week', '2023-10-07 12:00:00', '2023-10-07 10:00:00', '2023-10-07 11:00:00', '2023-10-07 09:00:00', 'High', 'Personal', 'Pending', 2),
('Complete Project Report', 'Finalize the annual report', '2023-10-10 17:00:00', '2023-10-10 09:00:00', '2023-10-10 16:00:00', '2023-10-10 08:00:00', 'Medium', 'Work', 'In Progress', 3),
('Plan Vacation', 'Organize the upcoming trip', '2023-10-15 10:00:00', '2023-10-14 15:00:00', '2023-10-14 17:00:00', NULL, 'Low', 'Travel', 'Pending', 4),
('Prepare Presentation', 'Slides for Monday meeting', '2023-10-08 09:00:00', '2023-10-07 20:00:00', '2023-10-07 22:00:00', '2023-10-07 19:00:00', 'High', 'Work', 'Completed', 3),
('Book Doctor Appointment', 'Routine check-up', '2023-10-09 09:00:00', NULL, NULL, '2023-10-08 10:00:00', 'Medium', 'Personal', 'Pending', 2);



INSERT INTO `Highlight` (`taskId`) 
VALUES
(1),
(2),
(3),
(4),
(5);



-- INSERT INTO `timer_details` (
--   `timer_name`,
--   `pomo_duration`,
--   `short_break_duration`,
--   `long_break_duration`,
--   `pomos_per_long_break`,
--   `user_id`
-- ) VALUES
--   ('Morning Routine', '00:30:00', '00:05:00', '00:20:00', 3, 1),
--   ('Email Review', '00:15:00', '00:03:00', '00:10:00', 2, 1),
--   ('Exercise', '00:45:00', '00:10:00', '00:30:00', 2, 2),
--   ('Lunch Break', '00:30:00', '00:05:00', '00:15:00', 2, 2),
--   ('Evening Relaxation', '00:20:00', '00:05:00', '00:15:00', 4, 3),
--   ('Family Time', '01:00:00', '00:10:00', '00:20:00', 1, 3),
--   ('Coding Session', '01:00:00', '00:10:00', '00:30:00', 4, 4),
--   ('Break Time', '00:15:00', '00:05:00', '00:10:00', 2, 4),
--   ('Meditation', '00:20:00', '00:05:00', '00:15:00', 3, 5),
--   ('Writing Session', '00:45:00', '00:08:00', '00:30:00', 4, 5);

-- INSERT INTO `hilights_hasintha` (`highlight_id`, `highlight_name`, `user_id`)
-- VALUES 
-- (1, 'Introduction to Ballerina', 101),
-- (2, 'Setting Up Ballerina Environment', 102),
-- (3, 'Understanding Ballerina Syntax', 103),
-- (4, 'Working with Ballerina Services', 104),
-- (5, 'Interacting with Databases in Ballerina', 105),
-- (6, 'Error Handling in Ballerina', 106),
-- (7, 'Building RESTful APIs with Ballerina', 107),
-- (8, 'Deploying Ballerina Applications', 108),
-- (9, 'Ballerina Integration with Other Systems', 109),
-- (10, 'Advanced Ballerina Features', 110);

-- INSERT INTO highlights.PausesPomoDetails (pauses_pomo_id,pomo_id, highlight_id, pause_time, continue_time)
-- VALUES 
-- (1,1, 9, '2024-07-31 11:27:07', '2024-07-31 11:27:08'),
-- (2,1, 9, '2024-07-31 11:27:10', '2024-07-31 11:27:11'),
-- (3,1, 9, '2024-07-31 11:27:12', '2024-07-31 11:27:14'),
-- (4,2, 7, '2024-07-31 11:37:18', '2024-07-31 11:37:20');

-- INSERT INTO highlights.HighlightPomoDetails (timer_id, highlight_id, user_id, start_time, end_time, status)
-- VALUES (10, 9, 11, '2024-07-31 11:27:14', '2024-07-31 11:27:17', 'complete'),
-- (8, 7, 11, '2024-07-31 11:37:23', '2024-07-31 11:37:26', 'complete');

-- INSERT INTO highlights.hi (id, title, dueDate, startTime, endTime, label, reminder, priority, description, status)
-- VALUES (1, 'Buy a present', '2024-08-01', '12:00:00', '13:00:00', 'Shopping', 'Before 30 minutes', 'medium', 'Description', 'pending'),
--        (2, 'Read emails', '2024-08-01', '08:00:00', '09:00:00', 'Reading', 'Before 10 minutes', 'high', 'Description', 'pending'),
--        (3, 'Buy milk', '2024-08-01', '13:00:00', '14:00:00', 'Shopping', 'Before 10 minutes', 'high', 'Description', 'pending'),
--        (4, 'Read a book', '2024-08-01', '20:00:00', '22:00:00', 'Reading', 'Before 10 minutes', 'high', 'Description', 'pending');
