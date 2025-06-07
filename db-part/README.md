# Fullstack Exam Project — Database Setup

This folder contains the database import script and related data files for seeding the database.
Do all the steps below in the db-part (folder)

---

## Setup Instructions

### 1

- Create a .env file in this folder.
- Put this in the .env file: DATABASE_URL=postgresql://username:password@host:port/dbname
- Update the DATBASE_URL with correct database credentials

### 2

- Install Python dependencies with: pip install -r requirements.txt

### 3

- Run the import script: python import_cryptos_updated.py
