require('dotenv').config()
var mysql = require('mysql');
var inquirer = require('inquirer');


//connect to the sql database
var connection = mysql.createConnection({
    host : 'localhost',
    port: 3306,
    user: 'root',

    //dotenv to hide password
    password: process.env.MYSQL_PW,
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    init();
  });

//inital function upon executing the script
function init() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'Enter the ID of the item you would like to purchase (1-10).'
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'How many would you like to purchase?'
            }
        ])
        .then(function(answer) {
            connection.query(
                'UPDATE products '
            )
        })
}