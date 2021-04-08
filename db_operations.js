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
            res.locals.user = result[0];
            res.send('0');
        }else{
            db.query(`INSERT INTO users (pseudo,email,password,birthdayDate) VALUES('${pseudo}','${email}',MD5('${password}'),'${birthdayDate}')`);
            db.query(`SELECT * FROM users WHERE email = '${email}' AND password = MD5('${password}')`,function(err,result){
         
                res.cookies.set('ID',result[0]['ID']);
                res.locals.user = result[0];
                res.send('0');
            })
        }
    });

    
})






router.post('/getUser',(req,res)=>{
    if(res.cookies.get('ID'))
    {
        db.query(`SELECT * FROM users WHERE ID = ${res.cookies.get('ID')}`,function(err,result){
            if(err) throw err;
            res.send(JSON.stringify(result[0]));
        });

    }
})

router.post('/uploadpfp',(req,res)=>{
    var id = res.cookies.get('ID');

    var file = req.files.file;

    file.mv('./views/assets/images/profile_pictures/',id+".png",function(err)
    {
        if(err) throw err;
        db.query(`UPDATE users SET pfp = 1 WHERE ID = ${id}`);
    })
})

router.post('/createServer',(req,res)=>{
    var name = req.body.servName;
    db.query(`SELECT max(ID)  from guilds`,function(err,result){
        if(err) throw err;
        db.query(`INSERT INTO guilds (name) VALUES('${name}')`);
        var maxID = result[0]['max(ID)']+1;
     
        db.query(`INSERT INTO guildmembers (memberID,isOwner,guildID) VALUES(${res.cookies.get('ID')},1,${maxID})`)
        db.query(`INSERT INTO channels (type,name,guildID,parent,increment) VALUES('category','SALONS TEXTUELS',${maxID},0,0)`);
        db.query(`INSERT INTO channels (type,name,guildID,parent,increment) VALUES('text','general',${maxID},1,0)`);
        db.query(`INSERT INTO channels (type,name,guildID,parent,increment) VALUES('category','SALONS VOCAUX',${maxID},0,1)`);
        db.query(`INSERT INTO channels (type,name,guildID,parent,increment) VALUES('voice','General',${maxID},1,0)`);

    })
    
    res.redirect('/');
})


router.post('/getGuilds',(req,res)=>{
    db.query(`SELECT * FROM guildmembers WHERE memberID = ${res.cookies.get('ID')}`,function(err,result)
    {
        if(err) throw err;
        res.send(JSON.stringify(result));

    })
})
router.post('/getGuildData',(req,res)=>{
    
    db.query(`SELECT * FROM guilds WHERE ID = ${req.body.guildID}`,function(err,result2){
        if(err) throw err;
       res.send(JSON.stringify(result2))
        
    })
})

router.post('/loadGuild',(req,res)=>{
    var guildID = req.body.guildID;
    db.query(`SELECT * from users WHERE ID = ${res.cookies.get('ID')}`,function(err,result){
        if(err) throw err;
        res.locals.user = result[0];
        db.query(`SELECT * FROM guilds WHERE ID = ${guildID}`,function(err,result){
            if(err) throw err;
            res.locals.guild = result[0];
            db.query(`SELECT * FROM guildmembers WHERE guildID = ${guildID}`,function(err,result)
            {
                if(err) throw err;
                res.locals.guildmembers = result[0];
                db.query(`SELECT * FROM channels WHERE guildID = ${guildID}`,function(err,result)
                {
                    res.locals.guildchannels = result[0];
                    res.render('guildContent',{});
                })
            })
        })
      
    })
    
})


module.exports = router;