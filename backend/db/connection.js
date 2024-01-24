const mongoose = require('mongoose');
const DB = "mongodb+srv://umar:123@cluster0.bkd1s1h.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(DB).then(()=>{
    console.log('Connected to database');
}).catch((err) =>{
    console.log('No connection')
});