const express = require('express');

const router = express.Router();

var db = require('mysql').createConnection({
    host:'fdb29.awardspace.net',
    database:'3796740_discordclone',
    user:'3796740_discordclone',
    password:'discordclone',
    port:'3306',
    charset:'utf8'
});

router.post('/login',(req,res)=>{
    const user = req.body.email;
    const password = req.body.password;

    db.query(`SELECT * FROM users WHERE email = ${user} AND password = MD5(${password})`,function(err,result){
        if(err) throw err;
        if(result.length == 1)
        {
            res.cookies.set('ID',result['ID']);
            res.redirect('/');
        }else{
            db.query(`SELECT * FROM users WHERE mobileNumber = ${user} AND password = MD5(${password})`,function(err,result){
             if(result.length == 1)
             {
                 res.cookies.set('ID',result['ID']);
                 res.redirect('/');
             }else{
                 return 0;
             }   
            })
        }
    });
})

module.exports = router;