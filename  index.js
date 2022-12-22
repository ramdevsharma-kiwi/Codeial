const express = require('express');
const cookieParser = require('cookie-parser')

const db  = require('./config/mongoose')
const app = express();
const port = 8000;

app.use(express.urlencoded());
app.use(cookieParser());


//  Use express router 
app.use('/',require('./routes/index'));

// set up the view engine 
app.set('view engine', 'ejs');
app.set('views','./views');


app.listen(port,function(err){
    if (err){
        console.log(`Error in running the server port: ${port}`)
    }
    console.log(`server is running on port: ${port}`)
})