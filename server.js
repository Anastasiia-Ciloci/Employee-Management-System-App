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
        return getAllEmpl().then((employees) => {
          console.log("");
          console.table(employees);
        });
      } else if (response.option === "Add Employee") {
        return addEmpl();
      } else if (response.option === "Update Employee Role") {
        return updateEmplRole();
      } else if (response.option === "View All Roles") {
        return getAllRoles().then((roles) => {
          console.log("");
          console.table(roles);
        });
      } else if (response.option === "Add Role") {
        return addRole();
      } else if (response.option === "View All Departments") {
        return getAllDeptm().then((departments) => {
          console.log("");
          console.table(departments);
        }); //viewAllDeptm();
      } else if (response.option === "Add Department") {
        return addDeptm();
      } else if (response.option === "Exit") {
        exit();
        //console.log("program exited");
      }
    });
};

const getAllEmpl = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM employee", function (err, results) {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getAllRoles = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM roles", function (err, results) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(results);
    });
  });
};

const getAllManagers = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM employee WHERE manager_id IS NULL",
      function (err, results) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      }
    );
  });
};

const getAllDeptm = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM department", function (err, results) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(results);
    });
  });
};

const updateEmplRole = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "roleUpdate",
        message: "Which employee's role do you want to update?",
        choices: [`SELECT * FROM roles`],
        //choices from sql table
      },
    ])
    .then((answer) => {
      console.log("role has been updated, will get from sql");
    });
};

const addEmpl = async () => {
  let roles = await getAllRoles();
  let managers = await getAllManagers();

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
        name: "role",
        message: "What is the employee's role?",
        choices: roles.map((role) => {
          return role.title;
        }),
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: ["None"].concat(
          managers.map((manager) => {
            return manager.first_name + " " + manager.last_name;
          })
        ),
      },
    ])
    .then((employee) => {
      let role_id = roles.find((role) => role.title === employee.role).id;
      let manager_id =
        employee.manager === "None"
          ? null
          : managers.find(
              (manager) =>
                manager.first_name === employee.manager.split(" ")[0] &&
                manager.last_name === employee.manager.split(" ")[1]
            ).id;

      var query = `INSERT INTO employee(first_name, last_name,role_id, manager_id) VALUES('${employee.firstName}', '${employee.lastName}', ${role_id}, ${manager_id})`;

      db.query(query, function (err, results) {
        if (err) {
          console.log(err);
        }
      });
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

const addDeptm = () => {
  return inquirer
    .prompt({
      type: "input",
      name: "name",
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
  promptQs().then(init).catch(init);
}

init();
