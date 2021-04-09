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
        db.query(`INSERT INTO channels (type,name,guildID,parent,increment) VALUES('category','SALONS TEXTUELS',${maxID},0,1)`);
        db.query(`INSERT INTO channels (type,name,guildID,parent,increment) VALUES('text','general',${maxID},1,0)`);
        db.query(`INSERT INTO channels (type,name,guildID,parent,increment) VALUES('category','SALONS VOCAUX',${maxID},0,2)`);
        db.query(`INSERT INTO channels (type,name,guildID,parent,increment) VALUES('voice','General',${maxID},2,0)`);

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
            db.query(`SELECT * FROM guildmembers WHERE memberID = ${res.cookies.get('ID')} AND guildID = ${guildID}`,function(err,resultT)
            {
                if(err) throw err;
                res.locals.guildmembers = resultT[0];
                db.query(`SELECT * FROM channels WHERE guildID = ${guildID}`,function(err,result)
                {
                   
                    res.locals.guildchannels = result;
                    res.render('guildContent',{});
                    

                    if(resultT[0]['lastChannel'] == 0){
                      
                    for(var i = 0;i<=result.length;i++)
                    {
                        if(result[i] == undefined) break;
                        if(result[i]['type'] == 'text' || result[i]['type'] == 'voice') return db.query(`UPDATE guildmembers SET lastChannel = ${result[i]['ID']} WHERE guildID = ${guildID} AND memberID = ${res.cookies.get('ID')}`);
                
                       
                    }
                    
                }
                })
            
            })
        })
     
    })
    
})


router.post('/getGuildCategories',(req,res)=>{
    var guildID = req.body.guildID;

    db.query(`SELECT * FROM channels WHERE guildID = ${guildID} AND type = 'category' ORDER BY increment ASC`,function(err,result)
    {
       
            if(err) throw err;
       
        res.send(result);
       
        
        
    })
})
router.post('/getGuildChannels',(req,res)=>{
    db.query(`SELECT * FROM channels WHERE guildID = ${req.body.guildID} AND type = 'text' AND parent = ${req.body.parent} OR guildID = ${req.body.guildID} AND type = 'voice' AND parent = ${req.body.parent}`,function(err,result)
    {
        if(err) throw err;
        res.send(result);
    })
})





router.post('/getSelectedChannel',(req,res)=>{
   
    db.query(`SELECT * FROM guildmembers WHERE guildID = ${req.body.guildID} AND memberID = ${res.cookies.get('ID')}`,function(err,result)
    {
        if(err) throw err;
        if(result[0]['lastChannel'] == req.body.channelID)
        {
 
            res.send('1');
        }else{
       
            res.send('0');
  

        }
    })
})


router.post('/changeLastChannel',(req,res)=>{
    
    db.query(`SELECT * FROM channels WHERE ID = ${req.body.target}`,function(err,result)
    {
        if(err) throw err;
        db.query(`UPDATE guildmembers SET lastChannel = ${req.body.target} WHERE memberID = ${res.cookies.get('ID')} AND guildID = ${result[0]['guildID']}`);
        res.send('0');
    })
})

router.post('/getGuildMemberData',(req,res)=>{
    db.query(`SELECT * FROM guildmembers WHERE guildID = ${req.body.guildID} AND memberID = ${res.cookies.get('ID')}`,function(err,result)
    {
        if(err) throw err;
        res.send(result[0]);
    })
})

router.post('/postMessage',(req,res)=>{
    var message = req.body.message;
    var channelID = req.body.channelID;

db.query(`INSERT INTO messages (channel,sender,content) VALUES (${channelID},${res.cookies.get('ID')},'${message}')`);

res.send('0');

})

module.exports = router;