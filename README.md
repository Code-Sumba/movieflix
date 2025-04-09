# MovieFlix - Movie Streaming & Info Website

A full-featured movie streaming and information website built with React.js, Node.js, and MongoDB.

## Features

### Frontend
- **Homepage** with featured movies carousel and sections for trending, latest, and categories
- **Movie Detail Page** with comprehensive information, trailers, and download links
- **Search Functionality** with filters for name, genre, or language
- **Category Browsing** including Hindi, English, South, Dubbed, Web Series, etc.
- **Responsive UI** built with Tailwind CSS
- **Dark/Light Mode Toggle**

### Admin Panel
- Manage movies (add, edit, delete)
- Upload posters, trailers, and descriptions
- Add download links manually or via scraper
- View scraper logs and manage scrapers
- View stats: Total Movies, Latest Added, Most Downloaded, etc.

### Backend/Scrapers
- Automatically scrape and update movie data from:
  - vegamovies.day
  - bollyflix.day
  - hdhub4u.bio
- Scheduled scraping every 6 hours via cron job
- MongoDB database for storing movie info and logs
- API endpoints for frontend and admin panel

## Project Structure

```
movieflix/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Main site pages
│   │   ├── admin/            # Admin panel components
│   │   ├── utils/            # Helper functions
│   │   └── styles/           # CSS and Tailwind styles
│   └── public/               # Static assets
│
├── backend/                  # Node.js server
│   ├── src/                  # Main server code
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── scrapers/             # Web scrapers for movie sites
│   └── utils/                # Helper functions
│
└── README.md                 # Project documentation
```

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (v4+)

### Setup Instructions

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/movieflix.git
   cd movieflix
   ```

2. **Install backend dependencies**
   ```
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string and other settings
   ```

3. **Install frontend dependencies**
   ```
   cd ../frontend
   npm install
   ```

## Running the Application

### Development Mode

1. **Start the backend server**
   ```
   cd backend
   npm run dev
   ```

2. **Start the frontend server**
   ```
   cd frontend
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Backend API: http://localhost:5000/api

### Running the Scrapers

1. **Run scrapers manually**
   ```
   cd backend
   npm run scrape
   ```

2. **Run a specific scraper**
   ```
   npm run scrape vegamovies
   ```

## Deployment

### Frontend
The frontend can be deployed to Vercel or any static hosting:
```
cd frontend
npm run build
```

### Backend
The backend can be deployed to Render, Heroku, or similar:
```
cd backend
npm start
```

## Performance Optimization Suggestions

1. **Implement Image Optimization**
   - Use next-gen formats (WebP, AVIF)
   - Implement lazy loading
   - Set up a CDN for media files

2. **Backend Caching**
   - Add Redis caching for frequently accessed data
   - Implement response compression

3. **SEO Improvements**
   - Add meta tags and structured data
   - Create a sitemap.xml and robots.txt
   - Implement server-side rendering for critical pages

## Future Enhancements

1. **Telegram Bot Integration**
   - Automatic notifications for new movies
   - Custom alerts for favorite genres/actors
   - User requests via Telegram commands

2. **Progressive Web App (PWA)**
   - Offline capabilities
   - Push notifications
   - Home screen installation

3. **User Accounts (Optional)**
   - Watchlist and favorites
   - Custom recommendations
   - Download history and preferences

## License

MIT © Abhi supekar
=======
# movieflix
>>>>>>> 6341d54002783cf20999c34ed52625847e9c56c7
