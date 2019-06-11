const express = require('express');
var bcrypt = require('bcrypt');

const api = express.Router();

const Users = require('./models/users');
const UserDetails = require('./models/userdetails');

api.get('/', function (req, res) {
    res.json({
        msg: 'mssg from auth'
    })
});
api.post('/login', function (req, res) {    
    const {username, password} = req.body;
    
    bcrypt.hash(password, 12, function (err, hashPass ) {
        Users.find({ username }, (err, succ)=> {
            if (err) {
                throw(err);
            }
            
            else if (succ.length > 0) {
                bcrypt.compare(password, succ[0].password).then((resp)=> {
                    if (resp == true) {
                        delete succ[0].password;
                        res.json({
                            'status': res.statusCode,
                            'message': 'Logged In',
                            'user': succ
                        })
                    }else{
                        res.json({
                            'status': 400,
                            'message': 'Password Not Match'
                        })
                    }
                }, err=> {
                    throw(err);
                })
            }else{
                res.json({
                    'status': 400,
                    'message': 'Username or Password Not Match'
                })
            }
            
        })
    })
})

api.post('/signup', function(req, res){
    const {username, password} = req.body;
    ////hashing the passwrd
    console.log("pass",password);
    bcrypt.hash(password, 12, (err, hashPass) =>{
        console.log("hash",hashPass);
        if (err) {
            // console.log(err);
            throw(err);
        }
        let newUser = new Users({
            username,
            password: hashPass
        });
        newUser.save((err,succ)=>{
            if (!err) {
                res.json({
                    'status': res.statusCode,
                    'message': 'data added',
                    'user': succ
                })
            }else{
                throw new Error(err);
            }
        })
    });
})

api.post('/add-details', (req, res)=>{
    const {id,name, fathername,address,email,phone} = req.body;
    let uerdetails = new UserDetails({
        user_id: id,
        name,
        father_name: fathername,
        email,
        phone,
        address: {
            street: address.street,
            city: address.city,
            country: address.country,
        }
    });
    uerdetails.save((err, succ) => {
        if (!err) {
            res.json({
                'status': res.statusCode,
                'message': 'data added',
                'user': succ
            })
        }else{
            throw new Error(err);
        }
    })

});

api.get('/get/:id', (req, res)=>{
    const id = req.params.id;
    UserDetails.find({user_id: id}, (err, list)=>{
        if (!err) {
            res.json({
                'status': res.statusCode,
                'message': 'data added',
                list
            })
        }else{
            throw new Error(err);
        }
    })
})
module.exports = api;
