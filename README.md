# Employee Analysis App

This website is made for our "Academic Internship" module. It is a website for companies to help keep track of tasks and employee statistics. You can add tasks to employees and assign them, and then you will see stats on that employee, productivity, efficiency, and more.

## Setup

### Clone the repo

### Start servers

**Frontend**

1. Open your terminal and run `cd frontend`
2. Run `npm i`
3. Run `npm run dev`
4. Frontend will run on [http://localhost:5173](http://localhost:5173)

**Backend**

1. Open terminal and run `cd backend`
2. Run `npm i`
3. Run `npm run dev`
4. Backend will run on [http://localhost:5000](http://localhost:5000)
5. Put a .evn in your backend folder with this in it
DB_HOST=localhost
DB_USER=yourusername
DB_PASSWORD=yourpassword
DB_DATABASE=employeewebsite

secretKey=(Shared in discord)

# Technologies

**Frontend**

- React.js
- TypeScript
- SCSS

**Backend**

- Node.js
- Express
- MySQL

**MySQL**
Run this script

-- Create the schema
CREATE SCHEMA IF NOT EXISTS EmployeeWebsite;

-- Use the schema
USE EmployeeWebsite;

CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    manager BOOLEAN DEFAULT FALSE,
    INDEX id (id) 
);

CREATE TABLE Tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(255),
    task_priority VARCHAR(50),
    task_difficulty VARCHAR(50),
    task_duedate DATE,
    task_description TEXT,
    task_completed_date DATE
);

CREATE TABLE Task_Employees (
    task_id INT,
    id INT, 
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id),
    FOREIGN KEY (id) REFERENCES employees(id), 
    PRIMARY KEY (task_id, id) 
);

INSERT INTO employees (name, surname, dob, email, username, password, manager) 
VALUES ('Kevin', 'Glennon', '1990-01-01', 'kevin.glennon@example.com', 'Kevin12', 'password1', TRUE); -- Set manager to TRUE for this example employee
INSERT INTO employees (name, surname, dob, email, username, password, manager) 
VALUES ('John', 'Doe', '1990-01-01', 'john.doe@example.com', 'John12', 'password1', FALSE); -- Set manager to TRUE for this example employee
