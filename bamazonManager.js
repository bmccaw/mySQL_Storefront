require('dotenv').config()
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');



//connect to the sql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',

    //dotenv to hide password
    password: process.env.MYSQL_PW,
    database: 'bamazon'
});

//connect to the sql database
connection.connect(function (err) {
    if (err) throw err;
});

initialize();

function initialize () {
    inquirer.prompt([{
        name: "action",
        message: "What would you like to do?",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function(answers) {
        var action = answers.action;
        switch (action) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
                break;
        }
    });
}