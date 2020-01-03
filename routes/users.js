const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const User = require("../models/User")

// @route   POST api/user
// @desc    Register a user
// @access  Public
router.post("/", [
    //check name
    check("username", "Please add name")
        .not()
        .isEmpty(),

    //check password
    check("password", "Please enter a password with 6 or more characters")
        .isLength({ min: 6 })
], async (req, res) => {

    //save error to array
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { username, password } = req.body

    try {
        let user = await User.findOne({ username })

        //check if username exist
        if (user) {
            return res.status(400).json({ msg: "User already exists" })
        }

        //if not exist, create new username
        user = new User({
            username,
            password
        })

        //generate salt
        const salt = await bcrypt.genSalt(10)

        //encrypt the password with hash
        user.password = await bcrypt.hash(password, salt)

        //save new user
        await user.save()

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
        console.log(error.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router