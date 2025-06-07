# Server

This folder contains the backend server code for the fullstack project.
Do all the steps below in crypto-server (folder)

---

## Setup Instructions

### 1: install dependecies

- Run: npm i

### 2: configure environment

- Create the .env file
- Copy the following to your .env and replace with acutal values:
  DATABASE_URL=postgresql://your_username:your_password@your_host:your_port/your_database
  PORT=5000
  NODE_ENV=development
  CLIENT_URL=http://localhost:5173
  SESSION_SECRET=your_session_secret_here

### 3: start development server

- Run the TypeScript server directly without compiling first: npx ts-node src/index.ts
- Or run the server with live reloading and automatic restarts on crashes: npm run dev

### 4: for production

- Compile TypeScript into JS files in the dist folder: npm run build
- Run the compiled JS: npm start
