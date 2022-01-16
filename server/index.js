const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ecomdb',
})

app.listen(3001,() => {
    console.log('running on 3001');
})


app.post('/register', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    console.log(username + password +  "  working with get req")

 db.query("INSERT INTO users (userName, password) VALUES (?,?)",[username,password], (err,result) => {
     if(!err)
    res.send('working insertion');
     else
     res.send(err);
 });
})

app.post('/login' , (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE userName = ? AND password = ?", 
    [username,password],
    (err,result) => {
        if(err)
            console.log({err: err})
        else
            {
                if(result.length > 0)
                    res.send(result)
                else
                    res.send({message: "No User Found"})
            }
    } )

})

