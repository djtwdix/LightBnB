CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE properties (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  cost_per_night INTEGER NOT NULL,
  parking_spaces SMALLINT,
  num_bedrooms SMALLINT,
  num_bathrooms SMALLINT,
  main_photo TEXT,
  cover_photo TEXT,
  active BOOLEAN DEFAULT TRUE,
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL
);

