
const express = require("express");
const order = express.Router();
const dbService = require('../database/dbservice');


order.post("/", async(req, res) => {
    const userId = req.session.user_id;
    const orderItems  = req.body;
    //console.log(userId);

    if (userId) {
        const db = dbService.getDbServiceInstance();
        let price = await calculateBill(orderItems);
        //console.log(price);
        if(price <= 0){
            res.status(500).json({ Error : 'Error calculating order total' }); 
        }
        //console.log(`value of price: ${price}`);
        db.placeNewOrder(userId,orderItems,price).then((data) => {
        if (data) {
          res.status(200).json({ data: data });
        } else {
        console.log("this is executed");
          res.status(500);
        }    
      })

    } else {
        //please login to place order message
        res.redirect("/");
        res.status(200).json({ 'Error': 'Please login to place an order' });
    }
});

const calculateBill = function (orderItems) {
    const db = dbService.getDbServiceInstance();
    const menu = {}; //array of pizzas
    return new Promise((resolve, reject)=>{
        db.getItemPrice().then((data) => {
            if (data) {
                    let sum=0;
                    //console.log(data)
                    for(var i=0;i<data.length;++i){
                        element=data[i];
                        menu[element.item_id]=element.item_price;
                    }
                    Object.keys(orderItems).forEach(function (key) {
    
                        sum+=menu[key]*orderItems[key];
                        //console.log(`KEY : ${key} --- VALUE : ${orderItems[key]} --- Price : ${menu[key]}`);
                        
                    });
                    resolve(sum);                    
                }else{
                    resolve(0);
                }
        });
    })
    

}

order.get("/all", (req, res) => {
    const userId = req.session.user_id;

    if (userId) {
        const db = dbService.getDbServiceInstance();

        db.getOrderdetails(userId).then((data) => {
        if (data) {
          res.status(200).json({ data: data });
        } else {
        console.log("this is executed");
          res.status(500);
        }
    
      })

    } else {
        //please login message
        res.redirect("/");
        res.status(200).json({ 'Error': 'Please login to place an order' });
    }
});

order.post("/update", async(req, res) => {
    const userId = req.session.user_id;
    const orderItems  = req.body;
    //console.log(userId);

    if (userId) {
        const db = dbService.getDbServiceInstance();
        let price = await calculateBill(orderItems);
        if(price <= 0){
            res.status(500).json({ Error : 'Error calculating order total' }); 
        }
        //console.log(`value of price: ${price}`);
        db.updateOrder(userId,orderItems,price).then((data) => {
        if (data) {
          res.status(200).json({ data: data });
        } else {
        console.log("this is executed");
          res.status(500);
        }    
      })

    } else {
        //please login to place order message
        res.redirect("/");
        res.status(200).json({ 'Error': 'Please login to place an order' });
    }
});


// GET of /orders/:id
order.get('/:id', (req, res) => {
const userId = req.session.userId || "";
const orderIdForUser = req.params.id;

if (userId) {
    getUserInfo(userId, db)
    .then(userInfo => {
        const orderSummQuery = `SELECT * FROM order_summary WHERE order_id = ${orderIdForUser}`;

        db.query(orderSummQuery)
        .then(data => {
            const orderData = data.rows;
            const structuredOrders = refactorOrder(orderData)[0];
            const user = userInfo;

            const params = { user, structuredOrders, iconsKey };
            res.render("new_order", params);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });

    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
} else {
    const user = generateEmptyUser();
    const params = { user, iconsKey };
    res.render("404", params);
}
});


module.exports = order


