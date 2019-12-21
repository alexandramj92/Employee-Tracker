USE employee_trackerDB;

SELECT employee.EmployeeID, employee.first_name, employee.last_name, roles.title, department.dep_name, roles.salary, employee.ManagerID
FROM department WHERE ? 
LEFT OUTER JOIN roles ON roles.DepartmentID=department.DepartmentID
LEFT OUTER JOIN employee ON roles.RoleID=employee.RoleID;  


