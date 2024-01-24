const express = require('express')
const dotenv = require('dotenv')
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
dotenv.config({path : './config.env'})
require('./db/connection');
const path = require('path');


app.use(express.json());
app.use(require('./router/auth'));


app.use(express.static(path.join(__dirname, 'frontend', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });

const PORT = process.env.PORT || 5000




app.listen(PORT, ()=>{

    console.log(`App is running on port ${PORT}`)
})