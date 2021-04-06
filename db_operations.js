const express = require('express');

const router = express.Router();

var db = require('mysql').createConnection({
    host:'localhost',
    database:'discordclone',
    user:'root',
    password:'',
});

router.post('/login',(req,res)=>{
   
    var user = req.body.email;
    var password = req.body.password;

    db.query(`SELECT * FROM users WHERE email = '${user}' AND password = MD5('${password}')`,function(err,result){
        if(err) throw err;
  
        if(result.length == 1)
        {
            
            res.cookies.set('ID',result[0]['ID']);

            return res.send('0');
        }else{
            db.query(`SELECT * FROM users WHERE mobileNumber = '${user}' AND password = MD5('${password}')`,function(err,result){
             if(result.length == 1)
             {
                locals.res.cookies.set('ID',result[0]['ID']);

                 
                 return res.send('0');
             }else{
                 return res.send('404');
             }   
            })
        }
    });
})
router.post('/register',(req,res)=>{
    
    var body = req.body;
    var email = body.email;
    var password = body.password;
    var pseudo = body.pseudo;
    var birthdayDate = body.birthdayDate;

    db.query(`SELECT * FROM users WHERE email = '${email}' AND password = MD5('${password}')`,function(err,result){
        if(err) throw err;
        if(result.length == 1)
        {
               
            res.cookies.set('ID',result[0]['ID']);
            res.send('0');
        }else{
            db.query(`INSERT INTO users (pseudo,email,password,birthdayDate) VALUES('${pseudo}','${email}',MD5('${password}'),'${birthdayDate}')`);
            db.query(`SELECT * FROM users WHERE email = '${email}' AND password = MD5('${password}')`,function(err,result){
         
                res.cookies.set('ID',result[0]['ID']);

                res.send('0');
            })
        }
    });

    
})

module.exports = router;