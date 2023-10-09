# WoW Marketplace

## 🚗 Wheels out Wanted & 🔧 Want out Wheels 🚗

Welcome to the ultimate platform tailored for every car enthusiast and seller. Dive into a collection of vehicles that cater to luxury seekers, everyday commuters, and everyone in between. And for those looking to pass on their ride, our platform makes selling smooth and straightforward. From discovering the car of your dreams to finding the perfect buyer for your wheels, we've got you covered. Explore, drive, sell, and thrive!

## The project is structured as follows:

```shell
.
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile and Pipfile.lock
├── README.md
├── requirements.txt
├── client
│ ├── package-lock.json and package.json
│ ├── public
│ │ ├── favicon.ico
│ │ ├── index.html
│ │ ├── manifest.json and other assets
│ └── src
│ ├── index.css and index.js
│ └── components
│ ├── App.js, HomePage.js, NavBar.js, NotFound.js
│ ├── car
│ ├── message
│ ├── review
│ └── user
└── server
├── app.py, config.py, models.py
├── resources
├── seed.py
└── uploaded_images
```

## Requirements

Ensure you have the following installed:

- Python 3.8 or higher
- Node.js and npm
- pipenv for managing Python dependencies.
- create-react-app for bootstrapping the frontend.

## Setup

1. Fork and clone the repository:

2. Install the dependencies:
   ```shell
   pipenv install
   ```
3. Open your virtual environment:

   ```shell
   pipenv shell
   ```

   ```shell
   cd server
   ```

4. To run the backend server:

   ```shell
   python app.py
   ```

5. In a separate terminal, navigate to the client directory and run the React app:

   ```shell
    cd client
    npm install
   ```

   After installed, run:

   ```shell
    npm start
   ```

### Upon launch, you can access the frontend on http://localhost:3000

### and the backend API on http://localhost:5555.

## Features

- User registration and authentication.
- CRUD functionality for cars, reviews, and messages.
- Interactive user dashboard.
- Responsive UI built with React.
- Backend API built with Flask.

### Instructions

This project showcases:

- Full-stack development with React and Flask.
- RESTful API design.
- Integration of frontend and backend.
- Database design with SQLAlchemy and SQLite.
- User authentication and session management.
- State management with React.

### Minimum requirements:

- A full-stack web application with a React frontend and Flask backend.
- A database with multiple related tables.
- User authentication.
- CRUD operations on various entities.
- Responsive and interactive UI.

### Stretch goals:

- Integration with third-party APIs.
- Advanced filtering and sorting features for cars
- Multiple Image uploading functionality.
- User profiles with detailed information.
