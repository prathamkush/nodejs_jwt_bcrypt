const express = require("express")

const router = express.Router()

const controller = require("../controller/UserController")

// API Paths 
router.post("/signup", controller.signup)
router.post("/login", controller.login)


// exporting the routes
module.exports = router