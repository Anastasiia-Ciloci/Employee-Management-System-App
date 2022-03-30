const inquirer = require("inquirer");
// const mysql = require("mysql2");
// const consoleTbl = require("console.table");

// const db = mysql.createConnection(
//   {
//     user: "root",
//     database: "employee_db",
//   },
//   console.log(`Connected to the employee_db database.`)
// );

const promptQs = () => {
  return inquirer
    .prompt({
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Exit",
      ],
    })
    .then((response) => {
      if (response.option === "View All Employees") {
        return viewAllDeptm();
      } else if (response.option === "Add Employee") {
        return addEmpl();
      } else if (response.option === "Update Employee Role") {
        return updateEmplRole();
      } else if (response.option === "View All Roles") {
        return viewAllRoles();
      } else if (response.option === "Add Role") {
        return addRole();
      } else if (response.option === "View All Departments") {
        return viewAllEmpl();
      } else if (response.option === "Add Department") {
        return addDeptm();
      } else if (response.option === "Exit") {
        exit();
        console.log("program exited");
      }
    });
};
//promptQs();

const viewAllEmpl = () => {
  console.log("Will return data of employees from sql");
  //i need to pull sql table of empl
};

const addEmpl = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "empRole",
        message: "What is the employee's role?",
        choices: [
          //choices from db sql table
          "bu",
          "ga",
          "gu",
        ],
      },
      {
        type: "list",
        name: "emplManager",
        message: "Who is the employee's manager?",
        choices: [
          "Tolik",
          "Vitalik",
          "Vit'ka",
          "none",
          // I guess i need a table of managers + none
        ],
      },
    ])
    .then((answer) => {
      console.log("employee added. will get from sql");
      //when "none" return NULL from manager id
    });
};

const updateEmplRole = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "roleUpdate",
        message: "Which employee's role do you want to update?",
        choices: ["intern", "student"],
        //choices from sql table
      },
    ])
    .then((answer) => {
      console.log("role has been updated, will get from sql");
    });
};

const viewAllRoles = () => {
  console.log("will get the roles from sql table roles");
  //need to pull all roles from sql
};
const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "roleDeptm",
        message: "Which department does the role belong to?",
        choices: [
          //roles from db tables
          "Service",
          "Engineer",
          "Bubblic",
        ],
      },
    ])
    .then((answer) => {
      console.log("role has been added");
    });
};
const viewAllDeptm = () => {
  console.log("will add from sql all department");
  //need to pull sql table employees
};

const addDeptm = () => {
  return inquirer
    .prompt({
      type: "input",
      name: "newDepartment",
      message: "What is the name of the department?",
    })
    .then((answer) => {
      console.log("department added");
    });
};

const exit = () => {
  process.exit();
};

const returnToPromtQs = () => {};

function init() {
  promptQs().then(init);
}

init();
