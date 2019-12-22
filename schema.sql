DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    DepartmentID INTEGER AUTO_INCREMENT NOT NULL,
    dep_name VARCHAR(30),
    PRIMARY KEY(DepartmentID)
);

CREATE TABLE roles (
    RoleID INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    DepartmentID INTEGER,

    PRIMARY KEY(RoleID),
    FOREIGN KEY(DepartmentID) REFERENCES department(DepartmentID)

);

CREATE TABLE employee(
    EmployeeID INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    RoleID INTEGER,
    ManagerID INTEGER,

    PRIMARY KEY(EmployeeID),
    FOREIGN KEY(RoleID) REFERENCES roles(RoleID),
    FOREIGN KEY(ManagerID) REFERENCES employee(EmployeeID)


);




