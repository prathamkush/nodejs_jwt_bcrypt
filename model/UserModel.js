const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// Creating a schema on type of data communicated to mongodb

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    hash_password: {
        type:String,
        required:true
    }

})

// custom functio for matching the entered password in request
// with the one in database(hash_password- after auto decrypting it here)
UserSchema.methods.comparePassword = function (reqst_pswd) {
    return bcrypt.compareSync(reqst_pswd, this.hash_password)
}



// var a = 10
// module.exports = a  -> can be used everywhere accessed using require(a)
module.exports = mongoose.model("users", UserSchema)