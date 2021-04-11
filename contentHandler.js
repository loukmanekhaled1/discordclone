const express = require('express');

const router = express.Router();


router.post('/loadBody',(req,res)=>{
    if(req.body.target == 'serverSettings')
    {
        res.render('assets/body/serverSettings');
    }
})


module.exports = router;