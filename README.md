# GameStore

GameStore is a modern web application designed for browsing and purchasing video games. The project features a responsive layout, personal wishlists, a shopping cart, and an administrative dashboard for game management.

## Project Structure

The project follows a modular and scalable directory structure:

- **src/components**: Reusable UI components co-located with their styles.
- **src/context**: React context providers for global state management.
- **src/hooks**: Custom React hooks for shared logic.
- **src/layouts**: Layout-level components such as the Sidebar and Welcome Popups.
- **src/pages**: Page-level components corresponding to application routes.
- **src/services**: API client configurations and data fetching logic.
- **src/styles**: Global styles and CSS utilities.
- **src/routes**: Route guarding and private route configurations.
- **src/assets**: Static assets including images and icons.

## Features

- **Game Discovery**: Explore a wide range of games with filtering and search capabilities.
- **User Authentication**: Secure login and registration for personal accounts.
- **Wishlist**: Save favorite games for future reference.
- **Shopping Cart**: Manage games before proceeding to checkout.
- **Admin Dashboard**: Specialized tools for administrators to manage the game catalog and user database.
- **Responsive Design**: Optimized for various screen sizes from mobile to desktop.

## Technical Stack

- **Frontend**: React, React Router
- **Styling**: Vanilla CSS
- **State Management**: React Context API
- **API Communication**: Axios
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Development and Deployment

The application is configured to communicate with a Render-hosted backend. Please note that the server may experience short delays during initial wake-up.

## License

This project is licensed under the MIT License.
