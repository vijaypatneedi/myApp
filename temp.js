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