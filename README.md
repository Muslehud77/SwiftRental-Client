

# SwiftRental

SwiftRental is a feature-rich car rental platform, providing users with a seamless experience for booking vehicles. This frontend project is built with modern web technologies, including TypeScript, React, Redux, and integrates payment gateways such as Stripe and Aamarpay.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
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

## Admin Credentials
To access the admin dashboard, use the following credentials:

- **Email**: admin@swiftrental.com
- **Password**: SwiftRental

## Links

[![Frontend Live Demo](https://img.shields.io/badge/Frontend%20Live%20Demo-SwiftRental-blue?style=for-the-badge&logo=appveyor)](https://swiftrental.vercel.app/)  

[![Server Repository](https://img.shields.io/badge/Server%20Repository-SwiftRental-blue?style=for-the-badge&logo=github)](https://github.com/Muslehud77/SwiftRental)

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
