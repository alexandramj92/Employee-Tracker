USE employee_trackerDB;

INSERT INTO department (dep_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO roles (title, salary, DepartmentID)
VALUES ("Sales Lead", 100000, 1),("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Accountant", 70000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, RoleID)
VALUE ("Alexandra", "Jackson", 5), ("Jennifer", "Carrier", 1), ("Eric", "Thompson", 7), ("Sam", "Trice", 4), ("Sophie", "David", 3), ("Bob", "Dylan", 2), ("Carrie", "Donald", 6), ("Ken", "Dude", 3);


