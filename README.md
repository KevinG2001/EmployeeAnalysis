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

-- Create the employeewebsite schema
CREATE SCHEMA IF NOT EXISTS employeewebsite;

-- Switch to the employeewebsite schema
USE employeewebsite;

-- Create the employees table
CREATE TABLE IF NOT EXISTS employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_firstname VARCHAR(50) NOT NULL,
    employee_surname VARCHAR(50) NOT NULL,
    employee_dob DATE NOT NULL,
    employee_email VARCHAR(100) NOT NULL,
    employee_username VARCHAR(50) NOT NULL,
    employee_password VARCHAR(50) NOT NULL,
    employee_manager BOOLEAN NOT NULL
);

-- Insert sample data into the employees table
INSERT INTO employees (employee_firstname, employee_surname, employee_dob, employee_email, employee_username, employee_password, employee_manager)
VALUES ('Kevin', 'G', '1990-05-15', 'kevin@gmail.com', 'kevin12', 'password', 1),
       ('John', 'Doe', '1985-08-20', 'john@gmail.com', 'john34', 'secret', 0),
       ('Jane', 'Doe', '1992-11-10', 'jane@gmail.com', 'jane87', 'mypassword', 0);

-- Create the tasks table
CREATE TABLE IF NOT EXISTS tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    task_priority INT NOT NULL,
    task_difficulty INT NOT NULL,
    task_duedate DATE NOT NULL,
    task_description TEXT,
    task_completed_date DATE
);

-- Insert sample data into the tasks table
INSERT INTO tasks (task_name, task_priority, task_difficulty, task_duedate, task_description, task_completed_date)
VALUES ('Make login system', 1, 3, '2024-04-30', 'Implement a secure login system with user authentication and session management', NULL),
       ('Fix home page', 2, 2, '2024-05-15', 'Optimize layout and design of the home page for better user engagement', NULL),
       ('Fix feedback system', 3, 1, '2024-05-20', 'Resolve issues with the feedback submission process and improve user feedback collection', NULL);

-- Create the assignedtasks table
CREATE TABLE IF NOT EXISTS assignedtasks (
    task_id INT,
    task_name VARCHAR(100),
    employee_id INT,
    employee_firstname VARCHAR(50),
    task_assignedDate DATE,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- Insert sample data into the assignedtasks table
INSERT INTO assignedtasks (task_id, task_name, employee_id, employee_firstname, task_assignedDate)
VALUES (1, 'Make login system', 1, 'Kevin', '2024-04-15'),
       (2, 'Fix home page', 2, 'John', '2024-04-15'),
       (3, 'Fix feedback system', 3, 'Jane', '2024-04-15');


INSERT INTO employees (name, surname, dob, email, username, password, manager) 
VALUES ('Kevin', 'Glennon', '1990-01-01', 'kevin.glennon@example.com', 'Kevin12', 'password1', TRUE); -- Set manager to TRUE for this example employee
INSERT INTO employees (name, surname, dob, email, username, password, manager) 
VALUES ('John', 'Doe', '1990-01-01', 'john.doe@example.com', 'John12', 'password1', FALSE); -- Set manager to TRUE for this example employee
