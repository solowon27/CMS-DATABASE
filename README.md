## Employee Management System
This is a command-line application that allows you to manage employees, roles, and departments in a database. It provides various functionalities such as viewing employees, adding employees, updating employee roles, viewing roles, adding roles, viewing departments, adding departments, and more.

## Prerequisites
Before running this application, make sure you have the following installed:

```Node.js```
```MySQL2```
```dotenv```
## Installation

To install the required dependencies, run the following command:

npm install
## Usage
To start the application, run the following command:

node server.js
Once the application is running, you will be presented with a list of options. Use the arrow keys to navigate and press Enter to select an option.

## Functionality
The application provides the following functionality:

View all employees
Add an employee
Update an employee's role
View all roles
Add a role
View all departments
Add a department
Update an employee's manager
View employees by manager
View employees by department
Delete a department
Delete a role
Delete a manager
Exit the application
## License
This project is licensed under the MIT License.

## Acknowledgements
This application uses the following libraries:
```inquirer``` - For interactive command-line prompts
```dotenv``` - For enviroment variables
```console.table``` - For formatting database query results into a table

This application relies on the following environment variables:

```DB_USER``` - The username for connecting to the MySQL database.
```DB_PASS``` - The password for connecting to the MySQL database.
```DB_NAME``` - The name of the MySQL database to use.
Make sure to set these environment variables before running the application.


# Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please create a new issue or submit a pull request.


# Contact
If you have any questions or need assistance with this application, please contact solowon27@hotmail.com.