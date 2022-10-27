const UserModel = require("../model/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req,res) => {
    console.log(req.body)
    // Encrypting the entered password during signup
    const encryptedPassword = bcrypt.hashSync(req.body.password,10);
    const user = new UserModel({
        name:req.body.name,
        email:req.body.email,
        hash_password:encryptedPassword       
    })   
    user.
        save().
        then( (data) => {
            res.send(data)
        }).
        catch( (error) => {
            res.send(error)
        })
}

// login
exports.login = (req,res) => {
    const email = req.body.email

    UserModel.findOne({email:email}, (err,user) => {
        if(err){
            throw err
        }
        // verfiying the password 
        // after decrypting the original in .comparePassword() in UserModel.js
        if(!user || !user.comparePassword(req.body.password)){
            res.status(401).json({
                message: "Authentication Failed !!"
            })
        }
        else{
            // If everything is correct (we have that email
            // and for that email the entered password is correct)
            return res.status(200).json({
                message:"Successfully Logged-in",
                email: user.email,
                name: user.name,
                // Assigning the token (after every successfull login) with
                // secret key here only
                token : jwt.sign(
                    {
                    email: user.email,
                    name: user.name,
                    _id: user._id
                    },
                    "wqioefaksd"
                )
            })
        }
    })
}


