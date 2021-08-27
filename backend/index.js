const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();


const userRoute = require('./routes/users');
const exerciseRoute = require('./routes/exercises');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g1juc.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;


const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/users', userRoute);
app.use('/api/exercise', exerciseRoute);

app.get('/', (req, res)=>{
    res.json({
        "message": "welcome to exercise server"
    })
})


const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server is running at port: ${port}`);
    connection.once('open',()=>{
        console.log('database connected')
    })
})