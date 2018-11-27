CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  price money,
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

/*CREATE TABLE IF NOT EXISTS temp (
  id integer,
  listingId integer,
  listingName varchar(140),
  checkIn date,
  checkOut date,
  guests integer,
  userName varchar(50),
  userId integer
);*/



-- CREATE INDEX listings_name ON bookings (listingName);

-- COPY listings FROM '/Users/aaroncohn/Documents/SDC/airbnb-clone-booking-module/booking-module/database/listings.csv' WITH (FORMAT csv, HEADER true);

