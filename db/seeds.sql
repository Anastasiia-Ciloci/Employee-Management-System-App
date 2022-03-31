USE employee_db;

INSERT INTO department (id, department_name) 

VALUES  (1, "Engineering"),
        (2, "Finance"),
        (3, "Sales"),
        (4, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Sales Lead", 100000, 3),
(2, "Salesperson", 80000, 3),
(3, "Lead Engineer", 150000, 1),
(4, "Software Engineer", 120000, 1),
(5, "Account Manager", 110000, 2),
(6, "Accountant", 90000, 2),
(7, "Legal Team Lead", 250000, 4),
(8, "Lawyer", 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES (01, "Anastasia", "Ciloci", 3),
(02, "Linda", "Stone", 3),
(03, "Robert", "McKenzie", 4),
(04, "William", "Peterz", 1),
(05, "Maria", "Gonzales", 2),
(06, "Kevin", "Smith", 4),
(07, "Bobby", "Cooper", 2),
(08, "Michelle", "Bernandini", 1);

