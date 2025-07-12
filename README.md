# React + TypeScript + Vite

Book Management System
This is a full-stack web application designed to manage a collection of books, allowing users to perform CRUD (Create, Read, Update, Delete) operations on books and also to simulate borrowing them. The application is built with a React frontend using Redux Toolkit Query for API interactions and a Node.js/Express backend with MongoDB for data persistence.

✨ Features
Book Listing: View a comprehensive list of all available books.

Add New Book: Easily add new books to the collection with details like title, author, genre, ISBN, copies, description, and availability.

Update Book Details: Modify existing book information, including automatic update of available status if copies reaches zero.

Delete Book: Remove books from the collection.

Borrow Books: Simulate borrowing books, tracking quantity and due dates.

Responsive Design: User interface adapts to different screen sizes (mobile, tablet, desktop).

Form Validation: Client-side form validation using Zod and React Hook Form.

Toast Notifications: User-friendly feedback for successful operations and errors using Sonner.

🚀 Technologies Used
Frontend
React: A JavaScript library for building user interfaces.

Redux Toolkit: Official, opinionated, batteries-included toolset for efficient Redux development.

RTK Query: A powerful data fetching and caching tool built on top of Redux Toolkit.

React Hook Form: For flexible and performant form management.

Zod: A TypeScript-first schema declaration and validation library.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Shadcn/ui: Reusable components built with Radix UI and Tailwind CSS.

React Router DOM: For declarative routing in React applications.

Date-fns: A modern JavaScript date utility library.

Sonner: An opinionated toast component for React.

Backend
Node.js: JavaScript runtime environment.

Express.js: A fast, unopinionated, minimalist web framework for Node.js.

Mongoose: MongoDB object modeling for Node.js.

MongoDB: A NoSQL document database.

TypeScript: A superset of JavaScript that adds static typing.

🛠️ Setup & Installation
Follow these steps to get the project up and running on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm or Yarn

MongoDB instance (local or cloud-based like MongoDB Atlas)

1. Clone the Repository
git clone <your-repo-url>
cd <your-project-folder>


2. Backend Setup
Navigate to your backend directory (e.g., cd backend if it's a separate folder).

# Install dependencies
npm install
# or
yarn install

# Create a .env file in the backend root and add your MongoDB URI
touch .env


Add the following to your .env file:

MONGODB_URI="mongodb://localhost:27017/your_book_db" # Replace with your MongoDB connection string
PORT=5001 # Or any port you prefer


3. Frontend Setup
Navigate to your frontend directory (e.g., cd frontend if it's a separate folder).

# Install dependencies
npm install
# or
yarn install

# Create a .env file in the frontend root (e.g., .env.local for Vite, .env for CRA)
touch .env.local # Or .env depending on your build tool


Add the following to your .env.local (or .env) file:

# For Vite projects (VITE_ prefix)
VITE_API_BASE_URL="http://localhost:5001/api" # Match your backend port and API prefix

# For Create React App (REACT_APP_ prefix)
# REACT_APP_API_BASE_URL="http://localhost:5001/api"


Important: Ensure the API_BASE_URL matches the URL where your backend will be running.

🏃 Running the Application
1. Start the Backend
Navigate to your backend directory and run:

npm start
# or
yarn start


The backend server should start on http://localhost:5001 (or your chosen port).

2. Start the Frontend
Navigate to your frontend directory and run:

npm run dev # For Vite
# or
npm start # For Create React App
# or
yarn dev # For Vite
# or
yarn start # For Create React App


The frontend application should open in your browser, usually at http://localhost:3000 or http://localhost:5173.

🌐 API Endpoints
The backend API provides the following main endpoints:

GET /api/books: Get all books.

GET /api/books/:bookId: Get a single book by ID.

GET /api/books?genre=:genreName: Get books filtered by genre.

POST /api/books: Add a new book.

PATCH /api/books/:bookId: Update partial details of a book.

DELETE /api/books/:bookId: Delete a book.

POST /api/books/:bookId/borrow: Borrow a specific book.

(Note: Ensure your backend implements the /api/books/:bookId/borrow endpoint if you've added the borrowBook mutation in RTK Query.)

📁 Project Structure (Example)
.
├── backend/
│   ├── src/
│   │   ├── models/           # Mongoose schemas (e.g., Books.ts)
│   │   ├── routes/           # Express routes (e.g., booksRoutes.ts)
│   │   ├── app.ts            # Express app setup
│   │   └── server.ts         # Server entry point
│   ├── .env                  # Environment variables
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.tsx           # Main App component
│   │   ├── main.tsx          # React entry point
│   │   ├── components/       # Reusable UI components (e.g., UpdateBook.tsx, BorrowBooks.tsx)
│   │   │   └── ui/           # Shadcn/ui components
│   │   ├── pages/            # Page-level components (e.g., Books.tsx, AddBook.tsx, UpdateBookPage.tsx)
│   │   ├── redux/            # Redux store, slices, and RTK Query API definitions
│   │   │   ├── api/          # baseApi.ts
│   │   │   └── store.ts
│   │   ├── lib/              # Utility functions (e.g., cn.ts)
│   │   ├── router.tsx        # React Router setup
│   │   └── index.css         # Tailwind CSS imports
│   ├── .env.local            # Frontend environment variables
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts        # or craco.config.js for CRA
└── README.md


🚀 Deployment
The frontend can be easily deployed to platforms like Vercel or Netlify.

Vercel:

Connect your Git repository to Vercel.

Vercel will automatically detect your React project.

Crucially, set the VITE_API_BASE_URL (or REACT_APP_API_BASE_URL) environment variable in your Vercel project settings to the deployed URL of your backend API.

The backend can be deployed to platforms like Render, Railway, or a custom VPS.

🤝 Contributing
Feel free to fork the repository, create a new branch, and submit pull requests.

📄 License
This project is licensed under the MIT License.