# Booking Module

## Related Projects
- https://github.com/BedandBreakfastClub/airbnb-clone-reviews-module
- https://github.com/BedandBreakfastClub/airbnb-clone-photo-module
- https://github.com/BedandBreakfastClub/airbnb-clone-similar-listings-module

## Table of Contents
1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

> From the booking-module directory:
```sh
npm run build
npm start
```

```sh
API routes:
  GET /api/rooms/:listingId/listingdetails
    returns info about room: {id, pricing, average_review, total_reviews, max_guests, cleaning_fee, service_fee}
  GET /api/rooms/:listingId/booking
    returns array of bookings for the room identified by listingId, see immediately below for shape
  POST /api/rooms/:listingId/booking
    creates a booking. Takes a request body with {
      id: the listing id, same as in url params,
      check_in: date,
      check_out: date,
      booking_location: string,
      user: string,
    }
    returns an object with the created booking. `_id` is the bookingId to reference subsequently
  PATCH /api/rooms/:listingId/booking
    updates a booking. takes a bookingId which is the `_id` returned from creating the booking, plus all the other same fields as a POST
  DELETE /api/rooms/:listingId/booking
   deletes a booking. looks up booking by bookingId which is the `_id` returned from creating the booking.
```

## Requirements

An `nvmrc` file is included if using [nvm]

- Node 6.13.0

## Development
> For development:
```sh
npm run react-dev
```

> Seed the database:
```sh
mongod
npm run seed
```
### Install Dependencies
```sh
npm install
```