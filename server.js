let mysql = require("mysql");
let inquirer = require("inquirer");
let consoleTable = require("console.table");
let managers = [];
let managerID = 0;

let connection = mysql.createConnection({
  host: "localhost",

  // Your port;
  port: 3306,

  // username
  user: "root",

  // password
  password: "9CznMGI&13x&",
  database: "employee_trackerDB"
});


connection.connect(function(err) {
    if (err) throw err;
    runTool();
    retrieveMan();
  });


function runTool() {
    inquirer
      .prompt({
          name:"action",
          type: "list",
          message: "What would you like to do?",
          choices: [
              "View All Employees",
              "View All Employees By Department",
              "View All Employees By Manager",
              "Add Employee",
              "Remove Employee",
              "Update Employee Role",
              "Update Employee Manager",
              "Update Employee Department",
              "exit"
          ]
      })
      .then(function(answer){
          switch (answer.action){
            case "View All Employees":
                allEmp();
                break;
            
            case "View All Employees By Department":
                allEmpDep();
                break;
            
            case "View All Employees By Manager":
                allEmpMan();
                break;

            case "Add Employee":
                addEmp();
                break;
            
            case "Remove Employee":
                remEmp();
                break;

            case "Update Employee Role":
                upEmpRole();
                break;

            case "Update Employee Manager":
                upEmpMan();
                break;

            case "Update Employee Department":
                upEmpDep();
                break;

            case "exit":
                connection.end();
                break;
          }
      });
}


function allEmp(){
    let query = "SELECT employee.EmployeeID, employee.first_name, employee.last_name, roles.title, department.dep_name, roles.salary, employee.ManagerID";
    query += " FROM roles"; 
    query += " LEFT OUTER JOIN department ON department.DepartmentID=roles.DepartmentID";
    query += " LEFT OUTER JOIN employee ON roles.RoleID=employee.RoleID"; 
    query += " ORDER BY EmployeeID;";

    connection.query(query, async function(err, res){
        if(err) throw err;
        try{
            console.table(res);
            await runTool();
        }
        catch(e) {
           console.log(e);
        }
        
    }); 
}



function allEmpDep() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What department would you like to search?",
        choices: [
            "Sales",
            "Legal",
            "Engineering",
            "Finance"
        ]
      })
      .then(function(answer) {
        let depChoice = answer.action;
        let query = "SELECT employee.EmployeeID, employee.first_name, employee.last_name, roles.title, department.dep_name, roles.salary, employee.ManagerID"; 
        query += " FROM department";  
        query += " LEFT OUTER JOIN roles ON roles.DepartmentID=department.DepartmentID";
        query += " LEFT OUTER JOIN employee ON employee.RoleID=roles.RoleID"; 
        query += " WHERE ?;"      
        
        connection.query(query, { dep_name: depChoice }, async function(err, res) {
            if(err) throw err;
            try{
                console.table(res);
                await runTool();
            }
            catch(e){
                console.log(e);
            }
          
        });
      });
  }
  
  function retrieveMan(){
    let query = "SELECT employee.EmployeeID, employee.first_name, employee.last_name, roles.title, department.dep_name, roles.salary, employee.ManagerID"
    query += " FROM roles"; 
    query += " LEFT OUTER JOIN department ON department.DepartmentID=roles.DepartmentID";
    query += " LEFT OUTER JOIN employee ON roles.RoleID=employee.RoleID"; 
    query += " ORDER BY EmployeeID;";

    connection.query(query, async function(err, res){
        if(err) throw err;
        try{
            for (let i = 0; i<res.length; i++){
                // console.log(res[i].first_name);
                managers.push(JSON.stringify(res[i].first_name));
                // console.log(`Manager array contains ${managers}`)
            }
            
            // await runTool();
        }
        catch(e) {
           console.log(e);
        }
        
    }); 

  }

  function allEmpManQuery(){
    let query = "SELECT employee.EmployeeID, employee.first_name, employee.last_name, roles.title, department.dep_name, roles.salary, employee.ManagerID"; 
        query += " FROM employee";  
        query += " LEFT OUTER JOIN roles ON roles.RoleID=employee.RoleID"; 
        query += " LEFT OUTER JOIN department ON department.DepartmentID=roles.DepartmentID";
        query += " WHERE ?;"      
        
        connection.query(query, { ManagerID: managerID }, async function(err, res) {
            if(err) throw err;
            try{
                console.table(res);
                await runTool();
            }
            catch(e){
                console.log(e);
            }
          
        });
  }

  function allEmpMan() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What manager would you like to search?",
        choices: managers
      })
      .then(function(answer) {
        let string = answer.action;
        let manChoice = string.replace(/^"(.+(?="$))"$/, '$1');
        let query = "SELECT employee.EmployeeID, employee.first_name, employee.last_name, roles.title, department.dep_name, roles.salary, employee.ManagerID"; 
        query += " FROM employee";  
        query += " LEFT OUTER JOIN roles ON roles.RoleID=employee.RoleID"; 
        query += " LEFT OUTER JOIN department ON department.DepartmentID=roles.DepartmentID";
        query += " WHERE ?;"      
        
        connection.query(query, { first_name: manChoice }, async function(err, res) {
            if(err) throw err;
            try{
                managerID = res[0].EmployeeID;
                allEmpManQuery();
            }
            catch(e){
                console.log(e);
            }
          
        });
      });
  }
  
  function addEmp() {
    inquirer
      .prompt([
          
        {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
        },

        {
            name:"lastName",
            type: "input",
            message: "What is the employee's last name?"
        },

        {
            name: "roleID",
            type: "input",
            message:"What is the employee's role ID? (1-Sales Lead, 2-Salesperson, 3-Lead Engineer. 4-Software Engineer, 5-Accountant, 6-Legal Team Lead, 7-Lawyer)"
        },

        {
            name: "managerID",
            type:"input",
            message: "What is the employee's manager ID? (Suggestion: view all employees to get the employee's ID you would like to assign as manager to this employee)"
        }
      
      
    ])
      .then(function(answer) {
        let firstName = answer.firstName;
        let lastName = answer.lastName;
        let roleID = answer.roleID;
        let managerID = answer.managerID;

        let query = "INSERT INTO employee (first_name, last_name, RoleID, ManagerID)"; 
        query += ` VALUES ("${firstName}", "${lastName}", ${roleID}, ${managerID}); `; 
      
            
        
        connection.query(query, async function(err, res) {
            if(err) throw err;
            try{
                await allEmp();
            }
            catch(e){
                console.log(e);
            }
          
        });
      });
  }


  function upEmpRole() {
    inquirer
      .prompt([
        
        {
        name: "upEmp",
        type: "input",
        message: "Which employee would you like to update?"
        },

        {
        name: "newRole",
        type: "input",
        message: "What is their new role?"
        }
    ])
      .then(function(answer) {
        let upEmp = answer.upEmp;
        let newRole = answer.newRole;
        let query = "UPDATE roles";
        query += " LEFT OUTER JOIN department ON department.DepartmentID=roles.DepartmentID";
        query += " LEFT OUTER JOIN employee ON roles.RoleID=employee.RoleID"; 
        query += ` SET title = "${newRole}"`;
        query += ` WHERE first_name = "${upEmp}";`; 
        
        connection.query(query, async function(err, res) {
            if(err) throw err;
            try{
                await allEmp();
            }
            catch(e){
                console.log(e);
            }
          
        });
      });
  }

  function upEmpMan() {
    inquirer
      .prompt([
        
        {
        name: "upMan",
        type: "input",
        message: "Which employee would you like to update?"
        },

        {
        name: "newManID",
        type: "input",
        message: "What is their new manager? (Suggestion: view all employees to idenfify the employee ID you would like to use to update the manager)"
        }
    ])
      .then(function(answer) {
        let upMan = answer.upMan;
        let newManID = answer.newManID;
        let query = "UPDATE employee";
        query += " LEFT OUTER JOIN roles ON roles.RoleID=employee.RoleID"; 
        query += " LEFT OUTER JOIN department ON department.DepartmentID=roles.DepartmentID";
        query += ` SET ManagerID = "${newManID}"`;
        query += ` WHERE first_name = "${upMan}";`; 
        
        connection.query(query, async function(err, res) {
            if(err) throw err;
            try{
                await allEmp();
            }
            catch(e){
                console.log(e);
            }
          
        });
      });
  }

  function remEmp() {
    inquirer
      .prompt(
        
        {
        name: "empName",
        type: "input",
        message: "Which employee would you like to remove?"
        }
    )
      .then(function(answer) {
        let empName = answer.empName;
        let query = "DELETE FROM employee";
        query += ` WHERE first_name = "${empName}";`; 
        
        connection.query(query, async function(err, res) {
            if(err) throw err;
            try{
                await allEmp();
            }
            catch(e){
                console.log(e);
            }
          
        });
      });
  }


  function upEmpDep() {
    inquirer
      .prompt([
        
        {
        name: "upEmp",
        type: "input",
        message: "Which employee would you like to update?"
        },

        {
        name: "newDep",
        type: "input",
        message: "What is their new department?"
        }
    ])
      .then(function(answer) {
        let upEmp = answer.upEmp;
        let newDep = answer.newDep;
        let query = "UPDATE department";
        query += " LEFT OUTER JOIN roles ON department.DepartmentID=roles.DepartmentID";
        query += " LEFT OUTER JOIN employee ON roles.RoleID=employee.RoleID"; 
        query += ` SET dep_name = "${newDep}"`;
        query += ` WHERE first_name = "${upEmp}";`; 
        
        connection.query(query, async function(err, res) {
            if(err) throw err;
            try{
                await allEmp();
            }
            catch(e){
                console.log(e);
            }
          
        });
      });
  }

  