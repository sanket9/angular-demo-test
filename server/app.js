const express = require('express')
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const api = require('./api');



const app = express();
app.use(cors());
app.use(bodyparser.json());

// Running Node Server
const port =  process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('Server On:' + port);
});

// Connection To MongoDb
mongoose.connect(db.dbUrl,{ useNewUrlParser: true }).then(function (sucess) {
    if (sucess) {
        console.log('connet to db..');
    }
},err=>{
    console.log(err);
})


app.use('/api', api);

app.get('/', function (req, res) {
    res.send('Wellcome ToDo Server')
});