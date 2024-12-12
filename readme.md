
# Event Management System

An Event Management System designed to streamline the process of managing and booking events. This project includes a **React.js** frontend and a **Node.js** backend with a **PostgreSQL** database.

---

## Features

- **User Authentication**: Secure login and registration.
- **Event Booking**: Organizers can book specific time slots across multiple days.
- **Calendar Integration**: Visualize available slots using an interactive calendar.
- **Role-based Access**: Access control for users and administrators.

---

## Project Structure

```
.
├── frontend/     # React.js application
├── backend/      # Node.js server with PostgreSQL
```

---

## Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v16 or later)
- **PostgreSQL**
- **npm** (Node Package Manager)

---

## Setup

### Backend

1. Navigate to the `backend/` directory:
   ```bash
   cd backend/
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database connection in `src/config/db.js`.

4. Start the backend server:
   ```bash
   npm start
   ```

The backend server will run on [http://localhost:5000](http://localhost:5000) by default.

### Frontend

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend/
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm run dev
   ```

The frontend server will run on [http://localhost:5173](http://localhost:5173) by default.

---

## Usage

1. Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2. Register or log in to access the event management features.
3. Navigate to the calendar view to book or manage events.

---

## Technologies Used

### Frontend
- React.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- PostgreSQL

