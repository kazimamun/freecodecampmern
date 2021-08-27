const User = require('../model/userModel');
const Exercise = require('../model/exerciseModel');
module.exports = {
    allExercise(req, res){

    },
    addExercise(req, res){
        let {email, description} = req.body;
        const duration = Number(req.body.duration);
        const date = Date.parse(req.body.date);
        User.findOne({email})
            .then(user=>{
                if(!user){
                    console.log("user not found")
                } else {
                    let userName = user.userName;
                    let exercise = new Exercise({userName,description, duration, date});

                }
            })
            .catch(err=>console.log(err))
    }
}