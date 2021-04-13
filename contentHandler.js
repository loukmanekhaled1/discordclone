const express = require('express');

const router = express.Router();


router.post('/loadBody',(req,res)=>{
    if(req.body.target == 'serverSettings')
    {
        res.render('assets/body/serverSettings');
    }
    if(req.body.target == 'createInvite')
    {
        var db = require('mysql').createConnection({
            host:'localhost',
            database:'discordclone',
            user:'root',
            password:'',
            charset:'utf8mb4'
        })
        db.query(`SELECT * FROM invites WHERE guildTarget = ${req.body.guildID} AND inviterID = ${res.cookies.get('ID')}`,function(err,result){
            if(err) throw err;
            if(result.length == 0)
            {
                function gO(){
                var currentInviteLink = generateString(10);
                    currentInviteLink = currentInviteLink.trim();
                db.query(`SELECT * FROM invites WHERE inviteLink = '${currentInviteLink}'`,function(err,result)
                {
                    if(err) throw err;
                    if(result.length == 0)
                    {
                        db.query(`INSERT INTO invites (guildTarget,inviteLink,inviterID) VALUES (${req.body.guildID},'${currentInviteLink}',${res.cookies.get('ID')})`);
db.query(`SELECT * FROM invites WHERE guildTarget = ${req.body.guildID} AND inviterID = ${res.cookies.get('ID')}`,function(err,result)
            {
                if(err) throw err;
                
                res.render('assets/body/createInvite.ejs',{inviteLink:'discordjumia.gg/'+result[0]['inviteLink']});

            });
                    }else{
                        gO();
                    }
                })
            }
            gO();
            
            }else{
                db.query(`SELECT * FROM invites WHERE guildTarget = ${req.body.guildID} AND inviterID = ${res.cookies.get('ID')}`,function(err,result)
            {
                if(err) throw err;
                res.render('assets/body/createInvite.ejs',{inviteLink:'discordjumia.gg/'+result[0]['inviteLink']});

            });
            }
        });
    }
})

function generateString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports = router;