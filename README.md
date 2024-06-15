# Car Wash Booking System

## Live URL

[https://assignment-3-car-wash-from-github.vercel.app/](https://assignment-3-car-wash-from-github.vercel.app/)

## Video Overview of Car Wash Booking System

[https://youtu.be/gHHvMhd9_Q8](https://youtu.be/gHHvMhd9_Q8)

## Description

The Car Wash Booking System is a web application that allows users to book car wash services conveniently.

## Features

- **User Authentication**: Users can sign up, log in, and see their Bookings.
- **Booking Management**: Customers can select a preferred date and time slot for their car wash Booking.
- **Service and Slot Management**: Admin can create different Car wash services and set time slots for those services. Admin can manage Bookings, update availability.
- **Error Handling**: Proper error messages are displayed for invalid inputs or failed operations.

## Technology Stack

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB (using Mongoose for ODM)
- **Validation**: Zod Validations
- **Authentication**: JSON Web Tokens (JWT)
- **Error Handling**: Custom middleware
- **Deployment**: Deployed on Vercel

## Installation and Setup

1. Clone this repository:

   ```bash
   git clone https://github.com/searchsakib/assignment-3-car-wash
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file with the following variables:

   ```
   PORT=5000
   DB_URI=Your Mongodb connnection Uri
   BCRYPT_SALT_ROUNDS= any number
   JWT_ACCESS_SECRET= Your JWT Secret
   JWT_ACCESS_EXPIRES= Your Jwt Token Expire time

   ```

4. Start the server:

   ```bash
   npm run start:dev
   ```

5. Access the application in your browser at `http://localhost:5000`.

## API Documentation

- **Authentication Routes**:

  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in an existing user.

- **Service Routes**:

  - `POST /api/services`: Create a Service. (Only Accessible by Admin)
  - `GET /api/services/:id`: Get a Service.
  - `GET /api/services`: Get all Services.
  - `PUT /api/services/:id`: Update Services (Only Accessible by Admin)
  - `DELETE /api/services/:id`: Delete (Soft Delete) a Service (Only Accessible by Admin)

- **Slot Routes**:

  - `POST /api/services/slots`: Create Slot (Only Accessible by Admin)
  - `GET /api/slots/availability`: Get available slots

- **Booking Routes**:
  - `POST /api/bookings`: Book a Service (Only Accessible by User).
  - `GET /api/bookings`: Get All Bookings (Only Accessible by Admin).
  - `PUT /api/my-bookings`: Get User's Bookings (Only Accessible by User).
