const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
module.exports = {
    login(req, res){
        let {email, password} = req.body;
        let isEmail = validator.isEmail(email);
        if(isEmail) {
            User.findOne({email})
                .then(user=>{
                    if(!user){
                        res.json('User Not Found')
                    } else {
                        bcrypt.compare(password, user.password, (err, result)=>{
                            if(err){
                                console.log(err)
                            } else {
                                if(!result) {
                                    res.status(400).json({
                                        message: `welcome ${user.email}, please input correct password`
                                    })
                                } else {
                                    res.status(200).json(user)
                                }
                            }
                        })
                    }
                })
                .catch(err=>console.log(err))
        } else {
            res.status(400).json({
                message: "email is wrong"
            })
        }        
    },
    register(req, res){
        let {userName, email, password} = req.body;
        const isEmail = validator.isEmail(email);
        if(isEmail){
            User.findOne({email})
                .then(user=>{
                    if(user){
                        res.status(400).json({
                            "message": "This Email Already Registered."
                        })                        
                    } else {
                        bcrypt.hash(password,11,(err, hash)=>{
                            if(err){
                                console.log(err)
                            } else {
                                const user = new User({userName, email, password:hash})
                                user.save()
                                    .then(user=>{
                                        console.log(`user added`)
                                        res.status(201).json(user)
                                    })
                                    .catch(err=>console.log(err))
                            }
                        })
                    }
                })
                .catch(err=>console.log(err))
        }
    },
    allUser(req, res){
        User.find()
            .then(users=>res.status(200).json(users))
            .catch(err=>console.log(err))
    },
    singleUser(req, res){

    }
}