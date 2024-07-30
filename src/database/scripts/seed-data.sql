

INSERT INTO `timer_details` (
  `timer_name`,
  `pomo_duration`,
  `short_break_duration`,
  `long_break_duration`,
  `pomos_per_long_break`,
  `user_id`
) VALUES
  ('Morning Routine', '00:30:00', '00:05:00', '00:20:00', 3, 1),
  ('Email Review', '00:15:00', '00:03:00', '00:10:00', 2, 1),
  ('Exercise', '00:45:00', '00:10:00', '00:30:00', 2, 2),
  ('Lunch Break', '00:30:00', '00:05:00', '00:15:00', 2, 2),
  ('Evening Relaxation', '00:20:00', '00:05:00', '00:15:00', 4, 3),
  ('Family Time', '01:00:00', '00:10:00', '00:20:00', 1, 3),
  ('Coding Session', '01:00:00', '00:10:00', '00:30:00', 4, 4),
  ('Break Time', '00:15:00', '00:05:00', '00:10:00', 2, 4),
  ('Meditation', '00:20:00', '00:05:00', '00:15:00', 3, 5),
  ('Writing Session', '00:45:00', '00:08:00', '00:30:00', 4, 5);




INSERT INTO `hilights_hasintha` (`highlight_id`, `highlight_name`, `user_id`)
VALUES 
(1, 'Introduction to Ballerina', 101),
(2, 'Setting Up Ballerina Environment', 102),
(3, 'Understanding Ballerina Syntax', 103),
(4, 'Working with Ballerina Services', 104),
(5, 'Interacting with Databases in Ballerina', 105),
(6, 'Error Handling in Ballerina', 106),
(7, 'Building RESTful APIs with Ballerina', 107),
(8, 'Deploying Ballerina Applications', 108),
(9, 'Ballerina Integration with Other Systems', 109),
(10, 'Advanced Ballerina Features', 110);

insert into users values(1, '6e4096d8-b99e-4b2d-a495-446cce5fcd7c');

insert into task_lists(user_id, title) values(1, 'Shopping'),(1, 'Grocery'),(1, 'Work'),(1, 'Travel');
