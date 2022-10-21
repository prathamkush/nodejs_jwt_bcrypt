// importing express module (as a const)
const express = require("express")
const mongoose = require("mongoose")



// initializing express app
const app = express()

// for creating the server on port 3000
app.listen(3000, () => {
    console.log("Server running on port 3000")
})

app.use(express.json())

// default route ("/") with response of a string
app.use("/welcome", (req,res) => { res.send("Welcome to node application here") })



// connecting to a database with mongoose library (mongoose.connect())
const uri = "mongodb+srv://pratham520:451228@cluster0.pe7oqtx.mongodb.net/node_jwt?retryWrites=true&w=majority" 
mongoose.
        connect(uri, {useNewUrlParser:true}).
        then(() => {console.log("Database connected")}).
        catch((error) => {console.log(error)})
