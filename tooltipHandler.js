const express = require('express');

const router = express.Router();

router.post('/guildTooltips',(req,res)=>{
    if(req.body.tooltip == 's1')
    {
        res.render('assets/tooltips/servMlist');
    }
})

module.exports = router;