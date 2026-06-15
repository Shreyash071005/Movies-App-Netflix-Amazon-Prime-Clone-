# Movies App

## Overview

Movies App is a React-based web application that allows users to browse trending, popular, and original movies, search for movies, view detailed movie information, and manage authentication using JWT tokens.

The application demonstrates concepts such as React class components, lifecycle methods, routing, authentication, authorization, API integration, and responsive design.

---

## Features

### Authentication
- User login with JWT authentication
- Protected routes
- Redirect unauthenticated users to login page
- Logout functionality

### Home Page
- Display Trending Movies
- Display Originals Movies
- Random featured movie banner
- Movie carousel using React Slick

### Popular Movies
- Display popular movies from API
- Navigate to movie details page

### Movie Details
- Detailed movie information
- Similar movies section
- Runtime conversion from minutes to hours and minutes
- Movie ratings and release information

### Search
- Search movies by title
- No results view
- Loading and error handling

### Account
- Display user information
- Logout functionality

### Error Handling
- API failure views
- Retry functionality
- Not Found page

### Responsive Design
- Mobile devices
- Tablets
- Desktop screens

---

## Technologies Used

- React.js
- React Router DOM
- React Slick
- React Icons
- JS Cookie
- React Loader Spinner
- CSS3
- REST APIs

---

## Project Structure

```text
src/
├── components/
│   ├── Login
│   ├── Home
│   ├── Popular
│   ├── Search
│   ├── Account
│   ├── Header
│   ├── Footer
│   ├── MovieCard
│   ├── MovieDetails
│   ├── ProtectedRoute
│   └── NotFound
├── App.js
└── index.js
```

---

## API Endpoints

### Login
```http
POST https://apis.ccbp.in/login
```

### Trending Movies
```http
GET https://apis.ccbp.in/movies-app/trending-movies
```

### Originals
```http
GET https://apis.ccbp.in/movies-app/originals
```

### Popular Movies
```http
GET https://apis.ccbp.in/movies-app/popular-movies
```

### Movie Details
```http
GET https://apis.ccbp.in/movies-app/movies/{movieId}
```

### Search Movies
```http
GET https://apis.ccbp.in/movies-app/movies-search?search={searchText}
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd movies-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

---

## Test Credentials

```text
Username: rahul
Password: rahul@2021
```

---

## Learning Objectives

- React Class Components
- Component Lifecycle Methods
- State Management
- Routing
- Authentication and Authorization
- API Integration
- Error Handling
- Responsive Web Design

---

## Future Enhancements

- Top Rated Movies Section
- Movie Pagination
- Advanced Search Filters
- Watchlist Functionality
- User Preferences

---

## Author

Shreyash Pawar

---

## License

This project was developed for educational and learning purposes.