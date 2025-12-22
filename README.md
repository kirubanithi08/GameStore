🎮 GameStore – React Frontend

A modern Game Store frontend application built with React.
The application supports role-based authentication and authorization using JWT, allowing different access levels for users (e.g., Admin and User).

🚀 Features

🕹️ Browse games

🗂️ Filter games by genre

🔍 Search games using search bar

❤️ Wishlist management

🛒 Cart management

🔐 JWT-based authentication

🧑‍💼 Role-based access control (Admin / User)

🚫 Protected routes based on user roles

📦 Axios for API communication

⚡ Responsive UI

🛠️ Tech Stack

Frontend: React

Routing: React Router

State Management: React Hooks / Context API

HTTP Client: Axios

Authentication: JWT (JSON Web Token)

Authorization: Role-Based Access Control (RBAC)

Styling: CSS / Tailwind / Bootstrap (update if applicable)

🧑‍💼 Role-Based Access Control (RBAC)

The application supports different user roles:

👤 User

Browse games

Search and filter games

Add games to wishlist

Add games to cart

🛠️ Admin

Access admin-only routes

Manage games (add / update / delete)

Manage genres (if applicable)

User role is extracted from the JWT payload and validated on protected routes.

🔐 Authentication & Authorization Flow

User logs in or registers

Backend returns a JWT token containing:

User ID

Role (e.g., ADMIN, USER)

Token is stored in localStorage

Axios attaches token to every request

React protected routes validate:

Authentication status

User role
