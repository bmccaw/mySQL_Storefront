create database bamazon;

use bamazon;

create table products(
item_id integer auto_increment not null primary key,
product_name varchar(100) not null,
department_name varchar(100),
price decimal (10,2),
stock_quantity integer
);

insert into products (product_name, department_name, price, stock_quantity)
values
('Super Mario Bros 3', 'Electronics', 15.00, 20),
('Smart TV', 'Electronics', 300.00, 10),
('A Tale of Two Cities', 'Books', 5.00, 25),
('Queen Mattress', 'Bedding', 999.99, 15),
('Laptop', 'Electronics', 899.95, 20),
('Electric Guitar', 'Music', 249.99, 5),
('Lamp', 'Homegoods', 18.99, 22),
('Cake Mixer', 'Kitchenware', 150, 10),
('Desk', 'Homegoods', 29.99, 6),
('Trashcan', 'Homegoods', 19.99, 12);

select * from products;