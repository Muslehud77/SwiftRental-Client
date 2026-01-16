# SwiftRental

<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/giff/starting-gif.gif" height="auto">

SwiftRental is an advanced car rental platform designed to offer users a seamless experience for booking vehicles. The platform supports role-based access, allowing admins to manage cars, approve bookings, and oversee trips, while users can browse and rent cars with ease. Integrated with secure payment gateways like Stripe and Aamarpay, it ensures smooth transactions. Additionally, the platform utilizes Google Maps for location tracking and features modern UI/UX with animations powered by Framer Motion and GSAP. SwiftRental is built using React, Redux, and TypeScript for a robust and scalable frontend.

**Note:** Google Maps API integration is currently unavailable due to insufficient API credits.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots and Demos](#screenshots-and-demos)
- [Admin Credentials](#admin-credentials)
- [Links](#links)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)

## Technologies Used
- **Frontend**: TypeScript, React, Redux, Redux Persist, RTK Query, TailwindCSS, ShadCN
- **Payments**: Stripe, Aamarpay
- **Other Tools**: Vite, Axios, GSAP, Framer Motion, React Router DOM, ESLint, PostCSS, Blurhash
- **APIs**: Google Maps API for car location tracking
- **Animations**: Framer Motion, GSAP

## Features
- User Authentication and Authorization
- Car Listing and Details
- Car Booking and Trip Management
- Admin Dashboard for Car and Booking Management
- Secure Payments with Stripe and Aamarpay
- Role-based access control for Admin functionalities
- Integrated Google Maps for location services
- Car image placeholders with Blurhash
- Smooth animations using Framer Motion and GSAP

### Admin Capabilities
- **Profile Management**: Admins can manage their profile details.
- **Manage Cars**: Add, edit, delete cars from the platform.
- **Booking Approvals**: Admins can approve or reject booking requests.
- **End Trips**: Admins can manage and end active trips.
- **Statistics**: View various platform performance metrics.

## Screenshots and Demos

### Admin Functionalities

**Admin Dashboard Overview**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/giff/sr-dashboard-gif-animation.gif" height="auto">

**Dashboard Statistics**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/admin-dashboard-stats.jpeg" height="auto">

**Manage Inventory**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/admin-manage-inventory.jpeg" height="auto">

**Edit Car Details**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/giff/edit-car-gif.gif" height="auto">

**Booking Management**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/admin-booking-management.jpeg" height="auto">

**Booking Approval Interface**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/admin-booking-approval.jpeg" height="auto">

**User Management**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/admin-user-management.jpeg" height="auto">

### User Functionalities

**Car Inventory Browsing**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/inventory.png" height="auto">

**Booking Confirmation**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/booking-confirmation.png" height="auto">

**Payment Options**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/payment-options.png" height="auto">

**Stripe Payment Interface**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/stripe.png" height="auto">

**User Bookings Management**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/user-bookings.jpeg" height="auto">

**Payment History**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/user-payment-history.jpeg" height="auto">

### Blurhash Image Loading Feature

**Blurhash Image Loading Demonstration**
<img src="https://github.com/Muslehud77/SwiftRental-Client/blob/main/screenshots/giff/blurhash-gif.gif" height="auto">

## Admin Credentials
To access the admin dashboard, use the following credentials:

- **Email**: admin@swiftrental.com
- **Password**: SwiftRental

## Links

[![Frontend Live Demo](https://img.shields.io/badge/Frontend%20Live%20Demo-SwiftRental-blue?style=for-the-badge&logo=appveyor)](https://swiftrental.vercel.app/)  

[![Server Repository](https://img.shields.io/badge/Server%20Repository-SwiftRental-blue?style=for-the-badge&logo=github)](https://github.com/Muslehud77/SwiftRental)

[![LinkedIn Post](https://img.shields.io/badge/LinkedIn%20Post-SwiftRental%20Project-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/posts/muslehud777_react-typescript-nodejs-activity-7249049507802296321-Q08j)

## Project Setup

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:

   ```sh
   git clone https://github.com/Muslehud77/SwiftRental-client.git
   ```

2. Navigate to the project directory:

   ```sh
   cd SwiftRental-client
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

   If you encounter issues, use the following command:

   ```sh
   npm install --force
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory with the following content:

   ```env
   VITE_IMAGEBB_API=api key of imagebb
   VITE_BASE_URL=http://server.com/api
   VITE_GOOGLE_MAP_API_KEY=api key of google map
   VITE_Stripe_PublishableKey=stripe publishable key
   ```

5. Start the development server:

   ```sh
   npm run dev
   ```

Feel free to explore and contribute to the project!

---

Thank you for checking out SwiftRental! If you have any questions or feedback, feel free to reach out.

---