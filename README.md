
# CookieNote Backend

This is the backend service for **[CookieNote](https://github.com/AsH1605/CookieNote)**, a note-taking application. The backend is built using modern web technologies, ensuring scalability, maintainability, and secure handling of user data.

## Tech Stack
| Component       | Technology |
|------------------|-------------|
| Language        | Typescript |
| Runtime         | Node.js |
| Framework       | Express.js |
| Database        | PostgreSQL |
| Query Builder   | Knex.js |
| Authentication  | JWT |
| Password Hashing| bcrypt |

---

## Architecture Overview

### Project Structure
```
/auth              - Contains JWT verification and user auth logic
/controller        - Contains all logic for handling requests and forming responses
/db                - Knex configuration and DB functions
/dto               - TypeScript interfaces for Data Transfer Objects
/error             - JS Error classes with error codes for different types of error responses
/models            - Database models 
/routes            - Defines user and note-related routes
```

### Routers
| Router | Purpose |
|---|---|
| `userRouter` | Handles user actions like register and login |
| `noteRouter` | Handles note actions like create, update, delete, fetch notes |

---

## Authentication
- Users register and login through the `userRouter`.
- Passwords are **hashed** before being stored in PostgreSQL.
- Authentication is handled using **JWT** tokens.
- Protected routes (note routes) require a valid **JWT token** to access.

---

## Environment Variables
The backend relies on environment variables for configuration. Example `.env` file:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_NAME=postgres
DB_PASSWORD=hi
JWT_SECRET=999
SALT=applepie
```

---

## Routes

### User Router (`/user`)
| Endpoint | Method | Description |
|---|---|---|
| `/register` | POST | Registers a new user |
| `/login` | POST | Logs in a user, returns JWT token |

### Note Router (`/note`)
| Endpoint | Method | Description |
|---|---|---|
| `/createNote` | POST | Creates a new note |
| `/getNotes` | GET | Fetch all notes for the logged-in user |
| `/getNote/:note_id` | GET | Fetch a specific note by ID |
| `/deleteNote/:note_id` | DELETE | Delete a note by ID |
| `/updateNote/:note_id` | PUT | Update a note by ID |


---
*Happy Coding 🍪*
