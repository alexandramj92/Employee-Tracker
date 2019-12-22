USE employee_trackerDB;

INSERT INTO department (dep_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO roles (title, salary, DepartmentID)
VALUES ("Sales Lead", 100000, 1),("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Accountant", 70000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, RoleID, ManagerID)
VALUE ("Alexandra", "Jackson", 5, 2), ("Jennifer", "Carrier", 1, 2), ("Eric", "Thompson", 7, 3), ("Sam", "Trice", 4, 1), ("Sophie", "David", 3, 1), ("Bob", "Dylan", 2, 3), ("Carrie", "Donald", 6, 3), ("Ken", "Dude", 3, 1);


