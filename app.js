"use strict"
require('dotenv').config();
const express = require('express');
const app = express();
const cookies = require('cookies');
const fs = require('fs');
const cors = require('cors');
const db_operations = require('./db_operations');
var port = process.env.PORT || 3000;

const bodyParser = require('body-parser');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    credentials:true
}))

app.use(express.static((__dirname+'/views/assets')));
app.set('views', __dirname+'/views');
app.set('view engine','ejs');
app.engine('ejs', require('ejs').__express);
app.use(cookies.express("a","b","c"));
app.use(db_operations);

app.get('/',(req,res)=>{
  
    if(res.cookies.get('ID')){
        res.render('home');
    }else{
    res.redirect('/login');
    }
})
app.get('/login',(req,res)=>{
    if(res.cookies.get('ID'))
    {
        res.redirect('/');
    }else{
    res.render('login');
    }
})
app.get('/register',(req,res)=>{
    if(res.cookies.get('ID'))
    {
        res.redirect('/');
    }else{
    res.render('register');
    }
})

app.get('*',(req,res)=>{

    res.render('errors/404');

})
app.listen(port,"0.0.0.0",()=>{
    console.log(`Server live on port ${port}`);
})
