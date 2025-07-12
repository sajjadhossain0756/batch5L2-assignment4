# React + TypeScript + Vite

## Book Management System

This is a full-stack web application designed to manage a collection of books, allowing users to perform CRUD (Create, Read, Update, Delete) operations on books and also to simulate borrowing them. The application is built with a React frontend using Redux Toolkit Query for API interactions and a Node.js/Express backend with MongoDB for data persistence.

## Project live link:
* https://batch5-l2-assignment4-lt23.vercel.app/

## ✨ Features

* Book Listing: View a comprehensive list of all available books.
* Add New Book: Easily add new books to the collection with details like title, author, genre, ISBN, copies, description, and availability.
* Update Book Details: Modify existing book information, including automatic update of available status if copies reaches zero.
* Delete Book: Remove books from the collection.
* Borrow Books: Simulate borrowing books, tracking quantity and due dates.
* Responsive Design: User interface adapts to different screen sizes (mobile, tablet, desktop).
* Form Validation: Client-side form validation using Zod and React Hook Form.
* Toast Notifications: User-friendly feedback for successful operations and errors using Sonner.

## 🚀 Technologies Used

### Frontend
* React: A JavaScript library for building user interfaces.
* Redux Toolkit: Official, opinionated, batteries-included toolset for efficient Redux development.
* RTK Query: A powerful data fetching and caching tool built on top of Redux Toolkit.
* React Hook Form: For flexible and performant form management.
* Zod: A TypeScript-first schema declaration and validation library.
* Tailwind CSS: A utility-first CSS framework for rapid UI development.
* Shadcn/ui: Reusable components built with Radix UI and Tailwind CSS.
* React Router DOM: For declarative routing in React applications.
* Date-fns: A modern JavaScript date utility library.
* Sonner: An opinionated toast component for React.

### Backend
* Node.js: JavaScript runtime environment.
* Express.js: A fast, unopinionated, minimalist web framework for Node.js.
* Mongoose: MongoDB object modeling for Node.js.
* MongoDB: A NoSQL document database.
* TypeScript: A superset of JavaScript that adds static typing.

## 🛠️ Setup & Installation

Follow these steps to get the project up and running on your local machine.

### Prerequisites
* Node.js (LTS version recommended)
* npm or Yarn
* MongoDB instance (local or cloud-based like MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/sajjadhossain0756/batch5L2-assignment4.git
cd batch5L2-assignment4