const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pizza_app',
    port: '3306'
});

connection.connect((err) => {
    if (err) {
        console.log("this was executed");
        console.log(err.message);
    }

    // console.log('db ' + connection.state);
});


function insert(userId, orderItems, price){
    const timestamp = new Date();
        const status = 1;

        return new Promise((resolve, reject) => {

            orderItems = JSON.stringify(orderItems);

            const query = "INSERT INTO `pizza_app`.`orders` (`user_id`, `order_items`, `price`, `status`, `timestamp`)  VALUES (?,?,?,?,?)";    
            console.log(userId, orderItems, price, status,timestamp);      
            connection.query(query, [userId, orderItems, price, status,timestamp], (err, result) => {
                if (err) {
                    console.log('Error inserting order : ', err);
                    reject(new Error(err.message))
                } else {
                    console.log('Result : ', result);
                    let output = {
                        Orderid: result.insertId,
                        userId: userId,
                        order_items: JSON.parse(orderItems),
                        price: price,
                        status: status,
                        timestamp: timestamp
                    };
                    resolve(output);
                }
            });
                
        });
}

insert(1, {'a' : 'b', 'c' : 'd'}, 46);