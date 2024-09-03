
# AdventureAlly

AdventureAlly is an e-commerce platform dedicated to camping enthusiasts. Our mission is to provide top-notch camping gear and accessories to ensure a safe, enjoyable, and memorable outdoor experience for everyone.

## Table of Contents
- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Admin Credentials](#admin-credentials)
- [Links](#links)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)


## Introduction
AdventureAlly is a comprehensive campers' shop where you can find everything you need for your next adventure. This project showcases my skills in Redux, Redux Persist, RTK Query, and Mongoose with a TypeScript backend. It’s my first complete project using these technologies.

## Technologies Used
- **Frontend**: React, Redux, Redux Persist, RTK Query, TailwindCSS
- **Backend**: Node.js, Express, Mongoose, TypeScript
- **Other Tools**: Vite, Axios, GSAP, React Router DOM, ESLint, PostCSS, Stripe

## Features
- User Authentication and Authorization
- Product Listing and Details
- Shopping Cart and Checkout
- Customer Reviews and Ratings
- Order Management
- Admin Dashboard for Product Management
- Secure Payments with Stripe

### Admin Capabilities
- **Profile Management**: Admins can manage their profile details.
- **Statistics**: View various statistics related to the platform's performance.
- **Manage Orders**: Admins can view and manage customer orders.
- **Manage Products**: Add, edit, and delete products listed on the platform.
- **Deleted Products**: View and restore previously deleted products.
- **Manage Users**: View and manage user accounts on the platform.
- **Add Product**: Add new products to the store.
- **Edit Product**: Edit details of existing products.

## Admin Credentials
To access the admin dashboard, use the following credentials:

- **Email**: admin@adventureally.com
- **Password**: AdventureAlly

## Links

[![Frontend Live Demo](https://img.shields.io/badge/Frontend%20Live%20Demo-AdventureAlly-blue?style=for-the-badge&logo=appveyor)](https://adventure-ally.netlify.app/)
[![Server Repository](https://img.shields.io/badge/Server%20Repository-AdventureAlly-blue?style=for-the-badge&logo=github)](https://github.com/Muslehud77/AdventureAlly-Server)

## Project Setup

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:

   ```sh
   git clone https://github.com/Muslehud77/AdventureAlly-client.git
   ```

2. Navigate to the project directory:

   ```sh
   cd AdventureAlly-client
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
   VITE_IMAGEBB_API=your_imagebb_api_key
   VITE_BASE_URL=http://localhost:5000/api
   ```

5. Start the development server:

   ```sh
   npm run dev
   ```

## Environment Variables
To run this project, you will need to add the following environment variables to your `.env.local` file:

```env
VITE_IMAGEBB_API=your_imagebb_api_key
VITE_BASE_URL=http://localhost:5000/api
```



Feel free to explore and contribute to the project!




---

Thank you for checking out AdventureAlly! If you have any questions or feedback, feel free to reach out.


