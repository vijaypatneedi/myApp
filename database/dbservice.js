const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// });

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


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }



    insertNewUser(email, phone, username, password, address) {
        console.log("insertuser called");
        const timestamp = new Date();

        return new Promise((resolve, reject) => {

            const query1 = "SELECT COUNT(*) AS cnt FROM `pizza_app`.`users` WHERE (email LIKE '%"+email+"%' OR phone LIKE '%"+phone+"%')";


            const query2 = "INSERT INTO `pizza_app`.`users` (email,phone,username,password,address,timestamp) VALUES (?,?,?,?,?,?)";

            

            connection.query(query1, [email, phone], (err, dbresult) => {
                console.log("query executed");
                if (err) {
                   console.log('Failed to execute the select query ', err);
                   reject(new Error(err.message))
                } else {
                    if (dbresult[0].cnt > 0) {
                        // Already exist 
                        resolve(false, {Error : 'Email already in use'});
                    } else {
                        connection.query(query2, [email, phone, username, password, address, timestamp], (err, result) => {
                            if (err) {
                                reject(new Error(err.message))
                            } else {
                                console.log('Result : ', result);
                                let output = {
                                    id: result.insertId,
                                    email: email,
                                    phone: phone,
                                    username: username,
                                    password: password,
                                    address: address,
                                    timestamp: timestamp
                                };
                                resolve(true, output);
                            }

                        });
                    }
                }
            });
        });
    };

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";

                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    updateUserById(id, name, phone) {

        id = parseInt(id, 10);

        return new Promise((resolve, reject) => {
            const query = "UPDATE names SET name = ?,phone=? WHERE id = ?";

            connection.query(query, [name, phone, id], (err, result) => {
                if (err) {
                    reject(new Error(err.message));
                } else {
                    resolve(result.affectedRows);
                }
            });
        });

        //return response === 1 ? true : false;
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;