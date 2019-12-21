let mysql = require("mysql");
let inquirer = require("inquirer");
let consoleTable = require("console.table");
let managers = [];


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

            case "exit":
                connection.end();
                break;
          }
      });
}


function allEmp(){
    let query = "SELECT employee.EmployeeID, employee.first_name, employee.last_name, roles.title, department.dep_name, roles.salary, employee.ManagerID"
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

  function allEmpMan() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What manager would you like to search?",
        choices: managers
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
  
funtion addEmp(){

}

  
// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);
