const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("../users/userModel")

const router = express.Router()

router.post('/login', (req,res)=>{
    Users.findBy({username: req.body.username})
        .then(user => {
            if (user && bcrypt.compareSync(req.body.password, user.password)){
                res.status(200).json({message: `Welcome ${req.body.username}!`})
            } else {
                res.status(401).json({message: "Invalid Credentials."})
            }
            
        })
        .catch(err => {
            res.status(500).json({name, message, stack})
        })
})

router.post('/register', (req,res)=>{
    const hash = bcrypt.hashSync(req.body.password, 8)
    req.body.password = hash

    Users.addUser(req.body)
        .then(id => {
            res.status(201).json({
                message: "Successfully created a new user.",
                user: {
                    id: id[0],
                    username: req.body.username
                }
            })
        })
        .catch(err => {
            res.status(500).json({name, message, stack})
        })
})

module.exports = router;