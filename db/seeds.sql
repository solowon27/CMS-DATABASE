USE CMS_DB;

INSERT INTO DEPARTMENTS (name) VALUES ('IT');
INSERT INTO DEPARTMENTS (name) VALUES ('MANAGEMENT');
INSERT INTO DEPARTMENTS (name) VALUES ('SERVER SIDE');
INSERT INTO DEPARTMENTS (name) VALUES ('CLIENT SIDE');

INSERT INTO ROLES (title, salary, department_id) VALUES ('CEO', 1000000, 4);
INSERT INTO ROLES (title, salary, department_id) VALUES ('DEVELOPER', 80000, 3);
INSERT INTO ROLES (title, salary, department_id) VALUES ('CFO', 65000, 2);
INSERT INTO ROLES (title, salary, department_id) VALUES ('SUPERVISOR', 65000, 1);

-- INSERT INTO MANAGERS (first_name, last_name, department_id) VALUES ('BELAYNESH', 'YIMER', 2);
-- INSERT INTO MANAGERS (first_name, last_name, department_id) VALUES ('CHRISTIAN', 'ANDERSON', 1);
-- INSERT INTO MANAGERS (first_name, last_name, department_id) VALUES ('JAMES', 'BOND', 3);
-- INSERT INTO MANAGERS (first_name, last_name, department_id) VALUES ('BRUCE', 'LEE', 4);

INSERT INTO EMPLOYEES (first_name, last_name, manager_id, role_id) VALUES ('BELAYNESH', 'YIMER', 45, 1);
INSERT INTO EMPLOYEES (first_name, last_name, manager_id, role_id) VALUES ('CHRISTIAN', 'ANDERSON', NULL, 2);
INSERT INTO EMPLOYEES (first_name, last_name, manager_id, role_id) VALUES ('JAMES', 'BOND', 34, 3);
INSERT INTO EMPLOYEES (first_name, last_name, manager_id, role_id) VALUES ('BRUCE', 'LEE', NULL, 4);

SELECT * FROM EMPLOYEES;
SELECT * FROM DEPARTMENTS;
SELECT * FROM ROLES;
-- SELECT * FROM MANAGERS;