const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const User = require("../models/User")
const auth = require("./../middleware/auth")

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post("/", [

    //check name
    check("username", "Please add name").not().isEmpty(),
    //check password
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })

], async (req, res) => {
    //save error to array
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { username, password } = req.body

    try {
        let user = await User.findOne({ username });

        //check if user exist, if not, return error msg
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }

        //if user exist, match password with stored password
        const isMatch = await bcrypt.compare(password, user.password)
        //if passwords do not match, return error message
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }
        //create payload object using user id

        const payload = {
            user: {
                id: user.id
            }
        }

        //create jwt token,get secret, set options and callback to send token or err
        jwt.sign(payload, config.get("jwtSecret"), {

            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json(token)
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})


// @route   GET api/auth
// @desc    Get user when login
// @access  Private
router.get("/", auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }

})





module.exports = router

