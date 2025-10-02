# Productive Task Manager

A simple and efficient web application for managing your daily tasks. Built with Node.js, Express, EJS,
and MongoDB, this app allows users to register, log in, create, update, filter, and delete tasks.
It also supports user account management features like logout and account deletion.

---

## Features

- User registration and authentication
- Create, view, update, and delete tasks
- Filter tasks by state (Pending, Completed, etc.)
- User logout and account deletion
- Responsive and user-friendly interface

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Noma7code/task-manager.git
   cd task-manager
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables in a `.env` file:
   ```
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   PORT=3000
   ```
4. Start the server:
   ```
   npm start
   ```
5. Visit [http://localhost:8080](http://localhost:8080) in your browser.

---

## API Endpoints

### Authentication

#### Register User

- **POST** `/api/auth/register-user`
- **Body:** `{ "name": "John", "email": "john@example.com", "password": "yourpassword" }`
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully"
  }
  ```

#### Login User

- **POST** `/api/auth/login-user`
- **Body:** `{ "email": "john@example.com", "password": "yourpassword" }`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful"
  }
  ```

#### Logout User

- **POST** `/api/auth/logout-user`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Logged out"
  }
  ```

#### Delete User Account

- **DELETE** `/api/auth/delete-user-account`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Account deleted successfully"
  }
  ```

---

### Tasks

#### Create Task

- **POST** `/api/tasks/create-task`
- **Body:** `{ "name": "Buy groceries" }`
- **Response:**
  ```json
  {
    "success": true,
    "task": {
      "_id": "taskid",
      "name": "Buy groceries",
      "state": "Pending"
    }
  }
  ```

#### Get All Tasks

- **GET** `/api/tasks/get-all-tasks`
- **Response:**
  ```json
  {
    "success": true,
    "tasks": [
      { "_id": "taskid", "name": "Buy groceries", "state": "Pending" },
      { "_id": "taskid2", "name": "Read book", "state": "Completed" }
    ]
  }
  ```

#### Update Task State

- **PATCH** `/api/tasks/update-task/:taskId`
- **Body:** `{ "state": "Completed" }`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Task updated"
  }
  ```

#### Delete Task

- **DELETE** `/api/tasks/delete-task/:taskId`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Task deleted"
  }
  ```

## License

This project is licensed under the MIT License.

---

## Author

- [Henry Anomah Yeboah](https://github.com/Noma7Code)
