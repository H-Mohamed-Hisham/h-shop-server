# 🛒 H-Shop — Online Shopping Web App (Server)

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

This repository contains the **server-side backend API** for **H-Shop**, a **full-featured online shopping platform**.  
It handles **user authentication**, **product & order management**, **Stripe payment processing**, **Cloudinary image uploads**, and **admin dashboard statistics**.

> ⚠️ **Note**: This is the **backend API** for H-Shop.  
> For the **client-side** React app, visit [H-Shop Client](https://github.com/H-Mohamed-Hisham/h-shop-client).

---

## 🔗 Live API

🚀 **Base URL** → [https://h-shop-server.onrender.com/api](https://h-shop-server.onrender.com/api)

---

## ✨ Features

### **Authentication & Security**

- 🔐 **JWT Authentication** — Secure login & signup.
- 👤 **Role-based Access** — Different access levels for **admins** and **customers**.
- 🔒 **Password Encryption** — Secured with **bcrypt**.

### **Product Management**

- ➕ **Add Products** — Admins can upload products with images.
- ✏️ **Edit Products** — Update details like price, description, and stock.
- ❌ **Delete Products** — Remove outdated products.
- ☁️ **Image Uploads** — Handled via [Cloudinary](https://cloudinary.com/).

### **Order Management**

- 🛒 **Place Orders** — Customers can create orders.
- 📦 **Order Tracking** — Customers can track order status.
- 📑 **Admin Dashboard** — Admins can view all orders, revenue, and product sales stats.

### **Payments**

- 💳 **Stripe Integration** — Secure online payments using [Stripe](https://stripe.com/).
- 🔄 **Payment Webhooks** — Automatic updates on successful/failed payments.

### **Dashboard Analytics**

- 📊 **Sales Insights** — Aggregated data for admins.
- 📈 **Interactive Charts** — Supports total revenue, number of orders, and product performance.

---

## 🛠️ Tech Stack (Server)

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Payment Gateway**: [Stripe](https://stripe.com/)
- **Authentication**: JWT + bcrypt
- **Deployment**: [Render](https://render.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/H-Mohamed-Hisham/h-shop-server.git
cd h-shop-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env file:

```
JWT_SECRET=your_secret
MONGODB_URI=mongodb_uri
NODE_ENV=development or production
CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=api_key
CLOUDINARY_API_SECRET=api_secret
```

### 4. Run the Development Server

```
npm run dev
```

Your app will be running at http://localhost:3000

Built with ❤️ using Node.js, Express, MongoDB, Cloudinary, and Stripe
