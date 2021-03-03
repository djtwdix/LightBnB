INSERT INTO users (name, email, password)
VALUES ('Daniel James', 'daniel@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
('Scott Mallory', 'scott@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Alex Kennedy', 'alex@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2021-09-11', '2021-09-26'),
(2, 2, '2021-03-04', '2019-04-01'),
(3, 3, '2021-10-01', '2021-10-14');