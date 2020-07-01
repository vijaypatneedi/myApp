connection.query("SELECT COUNT(*) AS cnt FROM tableName WHERE email = ? " , body.email , function(err , data){
    if(err){
        console.log(err);
    }   
    else{
        if(data[0].cnt > 0){  
                // Already exist 
        }else{
            connection.query("INSERT INTO ..." , function(err , insert){
                if(err){
                    // retunn error
                }else{
                    // return success , user will insert 
                }
            })                  
        }
    }
    })


    exports.login = async function(req,res){
        var email= req.body.email;
        var password = req.body.password;
        connection.query('SELECT * FROM users WHERE email = ?',[email], async function (error, results, fields) {
          if (error) {
            res.send({
              "code":400,
              "failed":"error ocurred"
            })
          }else{
            if(results.length >0){
              const comparision = await bcrypt.compare(password, results[0].password)
              if(comparision){
                  res.send({
                    "code":200,
                    "success":"login sucessfull"
                  })
              }
              else{
                res.send({
                     "code":204,
                     "success":"Email and password does not match"
                })
              }
            }
            else{
              res.send({
                "code":206,
                "success":"Email does not exits"
                  });
            }
          }
          });
      }