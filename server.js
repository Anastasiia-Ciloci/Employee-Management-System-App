const inquirer = require("inquirer");
const mysql = require("mysql2");
//const consoleTbl = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

// db.query("SELECT * FROM employee", function (err, results) {
//   console.log(results);
// });
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
        return viewAllEmpl();
      } else if (response.option === "Add Employee") {
        return addEmpl();
      } else if (response.option === "Update Employee Role") {
        return updateEmplRole();
      } else if (response.option === "View All Roles") {
        return viewAllRoles();
      } else if (response.option === "Add Role") {
        return addRole();
      } else if (response.option === "View All Departments") {
        return viewAllDeptm();
      } else if (response.option === "Add Department") {
        return addDeptm();
      } else if (response.option === "Exit") {
        exit();
        console.log("program exited");
      }
    });
};

const viewAllEmpl = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("");
    console.table(results);
    init();
  });
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
        type: "rawlist",
        name: "empRole",
        message: "What is the employee's role?",
        choices: [
          `SELECT * FROM role`,
          //choices from db sql table
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
      db.query(
        "SELECT * FROM employee(first_name, last_name,role_id) VALUES(?, ?,?)",
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log("");
          console.table(results);
          console.log(`employee ${employee}added. `);
          //when "none" return NULL from manager id
        }
      );
    });
};

const updateEmplRole = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "roleUpdate",
        message: "Which employee's role do you want to update?",
        choices: [`SELECT * FROM role`],
        //choices from sql table
      },
    ])
    .then((answer) => {
      console.log("role has been updated, will get from sql");
    });
};

const viewAllRoles = () => {
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log("");
    console.table(results);
    init();
  });
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
  db.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(" ");
    console.table(results);
    init();
  });
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

function init() {
  promptQs().then(init);
}

init();
