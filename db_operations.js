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
        return console.log(result);
        if(result.length == 1)
        {
            res.cookies.set('ID',result['ID']);
            res.redirect('/');
            return 0;
        }else{
            db.query(`SELECT * FROM users WHERE mobileNumber = ${user} AND password = MD5(${password})`,function(err,result){
             if(result.length == 1)
             {
                 res.cookies.set('ID',result['ID']);
                 res.redirect('/');
                 return 0;
             }else{
                 return -1;
             }   
            })
        }
    });
})

module.exports = router;