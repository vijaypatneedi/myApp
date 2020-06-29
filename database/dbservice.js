const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
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


    insertNewUser(email,phone,username,password,address) {
        
        const timestamp = new Date();
        
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO `pizza_app`.`users` (email,phone,username,password,address,timestamp) VALUES (?,?,?,?,?,?)";

            connection.query('SELECT email FROM users WHERE email ="' + mysql.escape(email) +'"', function (err, result) {
                if (err) throw err;
                console.log(result);
                //You will get an array. if no users found it will return.
            
                if(result[0].email.length > 0){  
            
                    connection.query(query, [name,phone, dateAdded] , (err, result) => {
                    if (err){
                        reject(new Error(err.message))
                    } else{
                        //console.log('Result : ', result);
                        let output = {
                            id : result.insertId,
                            name : name,
                            phone : phone,
                            dateAdded : dateAdded
                        };
                        resolve(output);
                    }
                    
                });




                    res.send('Welcome');
                }
                });





        });          

        
    };

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
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

    updateUserById(id, name,phone) {
        
            id = parseInt(id, 10);
            
            return new Promise((resolve,reject)=>{
                const query = "UPDATE names SET name = ?,phone=? WHERE id = ?";

                connection.query(query, [name,phone, id] , (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    }else{
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