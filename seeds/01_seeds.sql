INSERT INTO users (name, email, password)
VALUES ('Daniel James', 'daniel@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
('Scott Mallory', 'scott@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Alex Kennedy', 'alex@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO  properties (owner_id, title, description, cost_per_night, parking_spaces, 
                         num_bedrooms, num_bathrooms, main_photo, cover_photo
                         country, city, province, street, postal_code, active)
VALUES (1, '259 Aberdeen', 'description', 79, 1, 2, 1, "https://www.photourl.com/main.jpg", "https://www.photourl.com/cover.jpg",
           'Canada', 'Fredericton', 'New Brunswick', '259 Aberdeen St.', 'E3B 1R6', true)
VALUES (2, '45 Laroux', 'description', 115, 1, 2, 1, "https://www.photourl.com/main2.jpg", "https://www.photourl.com/cover2.jpg",
           'Canada', 'Montreal', 'Quebec', '45 Laroux Crt.', 'M7H 3H9', true)
VALUES (3, '2372 Mclaughlin', 'description', 150, 4, 6, 3, "https://www.photourl.com/main3.jpg", "https://www.photourl.com/cover3.jpg",
           'Canada', 'Moncton', 'New Brunswick', '2372 Mclaughlin Rd.', 'E5B 2V9', true)

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 2, '2021-09-11', '2021-09-26'),
(2, 3, '2021-03-04', '2019-04-01'),
(3, 1, '2021-10-01', '2021-10-14');