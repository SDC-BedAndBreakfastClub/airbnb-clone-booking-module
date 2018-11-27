CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  pricing money,
  name varchar(140),
  average_review numeric,
  total_reviews integer,
  max_guests integer,
  cleaning_fee money,
  service_fee money
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  listing_id integer REFERENCES listings (id),
  checkIn date,
  checkOut date,
  guests integer,
  username varchar(50),
  user_id integer
);



