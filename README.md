# E-Library Dashboard (SPA + MPA + OAuth Mock)

## Project Title and Summary

**E-Library Dashboard** is a comprehensive digital library management system that allows users to browse, search, and borrow books while providing administrators with full control over the book collection and user management. The application features a unique **SPA/MPA toggle functionality**, enabling users to switch between Single Page Application and Multi-Page Application modes for different user experiences.

## Key Features

### Core Functionality
- **User Authentication** - Mock OAuth implementation with JWT tokens
- **Searchable Book Collection** - Browse and search digital books with filters
- **Book Borrowing System** - Secure book borrowing with due dates and history tracking
- **Admin Management** - Complete CRUD operations for books and user management
- **SPA/MPA Toggle** - Switch between Single Page and Multi-Page Application modes
- **Role-Based Access Control** - Different permissions for Admin and User roles
- **Responsive Design** - Mobile-friendly interface with modern UI components

### Advanced Features
- 📚 **Book Management** - Add, edit, delete books with cover image uploads
- 👥 **User Management** - Admin can manage user accounts and permissions
- 📊 **Borrowing History** - Track all borrowing activities with detailed records
- 🔍 **Advanced Search** - Filter books by title, author, and availability
- 🔄 **Real-time Updates** - Live status updates for book availability
- 📱 **Mobile Responsive** - Optimized for all device sizes

## Technologies Used

### Frontend Stack
- **React 18** - Modern JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Redux Toolkit** - State management with RTK Query for API calls
- **React Router v7** - Client-side routing
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Lucide React** - Modern icon library
- **Axios** - HTTP client for API requests

### Backend Stack
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Passport.js** - Authentication middleware (Google OAuth + Local)
- **JWT** - JSON Web Tokens for secure authentication
- **bcrypt** - Password hashing
- **Express Session** - Session management
- **CORS** - Cross-origin resource sharing


## How to Run (Local Setup Instructions)

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)


# Start development server
npm run dev
```

# Start development server
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Login**: Use seeded admin account or register new admin
- **User Login**: Register as regular user or use Google OAuth

## API Overview (Sample Endpoints)

### Authentication Endpoints
```
POST /api/v1/auth/login             # Credentials login
POST /api/v1/auth/refresh-token     # Get new access token
POST /api/v1/auth/logout            # User logout
GET  /api/v1/auth/google            # Google OAuth login
GET  /api/v1/auth/google/callback   # Google OAuth callback
```

### User Management Endpoints
```
POST  /api/v1/user/register         # User registration
GET   /api/v1/user/me               # Get current user
GET   /api/v1/user/all-users        # Get all users (Admin only)
PATCH /api/v1/user/:id              # Update user (Admin only)
```

### Book Management Endpoints
```
POST   /api/v1/book/create          # Create book (Admin only)
PATCH  /api/v1/book/:id             # Update book (Admin only)
DELETE /api/v1/book/:id             # Delete book (Admin only)
GET    /api/v1/book/all-books       # Get all books (with search/filter)
GET    /api/v1/book/:id             # Get single book
```

### Borrowing Endpoints
```
POST  /api/v1/borrow/create-borrow  # Create borrow
GET   /api/v1/borrow/all-borrows    # Get all borrowing history (Admin)
GET   /api/v1/borrow/my-borrows     # Get user's borrowing history
PATCH /api/v1/borrow/:borrowId      # Update borrow status (return book)
```

### Sample API Request/Response

**POST /api/v1/auth/login**
```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "USER"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## Security Features Implemented

### Authentication & Authorization
- **JWT Token Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Role-Based Access Control** - Admin and User role permissions
- **Route Protection** - Protected routes based on authentication status
- **Session Management** - Secure session handling with Express Session

### API Security
- **Input Validation** - Zod schema validation for all inputs
- **CORS Configuration** - Controlled cross-origin resource sharing
- **Error Handling** - Secure error responses without sensitive data exposure
- **Request Rate Limiting** - Protection against abuse (can be implemented)
- **SQL Injection Prevention** - MongoDB and Mongoose provide built-in protection

### OAuth Implementation
- **Google OAuth 2.0** - Secure third-party authentication
- **Token Refresh** - Automatic token renewal mechanism
- **Secure Redirects** - Validated redirect URLs for OAuth flow


## SPA vs MPA Implementation

### SPA Mode (Default)
- **Navigation**: React Router for client-side routing
- **Performance**: Instant page transitions
- **User Experience**: Smooth, app-like experience
- **SEO**: Limited

### MPA Mode
- **Navigation**: Full page reloads with server requests
- **Performance**: Traditional web page loading
- **User Experience**: Classic website experience with loading indicators
- **SEO**: Better search engine optimization

### Role of Group Member
- **Rounak**: UI Design
- **Monir**: Frontend 
- **Monir**: Backend, Database and overall  