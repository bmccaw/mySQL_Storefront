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

showInventory();

function showInventory() {
    var productTable = new Table({
        chars: {
            'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
            , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
            , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
            , 'right': '║', 'right-mid': '╢', 'middle': '│'
        },
        head: ['item_ID', 'product_name', 'department_name', 'price', 'stock_quantity']
    });
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.log('===================\n');
        console.log('Current Inventory');
        console.log('===================\n');

        for (var i = 0; i < result.length; i++) {
            var id = result[i].item_id;
            var name = result[i].product_name;
            var department = result[i].department_name;
            var price = result[i].price;
            var quant = result[i].stock_quantity;
            productTable.push(
                [id, name, department, price, quant]
            );
        }

        console.log(productTable.toString());
        promptUser();
    });
};

//Prompts user to enter product id and amount to purchase
function promptUser() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: 'Enter the ID of the item you would like to purchase.'
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'How many would you like to purchase?'
            }
        ])
        .then(function (answers) {
            connection.query(
                //check that the quantity chosen is more than what is available
                'SELECT stock_quantity FROM products WHERE item_id = ?', [answers.id], function (err, result) {
                    if (err) throw err;
            
                    if (answers.quantity > result[0].stock_quantity) {
                        console.log('Insufficient inventory! Please select a lower quantity.')
                        promptUser();
                    } else {
                        //updates quantity in the database based on what the user selected
                        var newQuant = result[0].stock_quantity - answers.quantity;
                        connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [
                            newQuant, answers.id],
                         function (err, result) {
                            if (err) throw err;
                            console.log('Transaction successful!');
                            showInventory();
                        });
                    }
                }

            )
        })
}