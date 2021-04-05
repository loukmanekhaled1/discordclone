require('dotenv').config();
const express = require('express');
const app = express();
const cookies = require('cookies');
const fs = require('fs');

var port = process.env.PORT || 3000;
app.use(cookies.express("a","b","c"));

app.use(express.static((__dirname+'/views/assets')));
app.set('views', __dirname+'/views');
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    if(res.cookies.get('ID')){

    }else{
    res.redirect('/login');
    }
})
app.get('/login',(req,res)=>{
    res.render('login');
})
app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('*',(req,res)=>{

    res.render('errors/404');

})
app.listen(port,()=>{
    console.log(`Server live on port ${port}`);
})


