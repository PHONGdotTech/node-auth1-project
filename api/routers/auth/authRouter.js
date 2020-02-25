const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("../users/userModel")

const router = express.Router()

router.post('/login', (req,res)=>{
    console.log(req.session)
    Users.findBy({username: req.body.username})
        .then(user => {
            if (user && bcrypt.compareSync(req.body.password, user.password)){
                req.session.loggedIn = true;
                console.log(req.session)
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
            console.log("created new user. set loggedIn=true")
            req.session.loggedIn = true;
            res.status(201).json({
                message: "Successfully created a new user. Automatically logged in.",
                user: {
                    id: id[0],
                    username: req.body.username
                }
            })
        })
        .catch(err => {
            console.log("Failed to create new user")
            res.status(500).json("Failed to create new user")
        })
})

router.get('/logout', (req,res)=>{
    if(req.session){
        req.session.destroy(err => {
          if (err){
            res.status(500).json({messag:"Cannot log out"})
          } else {
            console.log("Successfully logged out")
            res.status(200).json({message:"Successfully logged out."})
          }
        })
    } else {
        res.status(200).json({message: "Already logged out"})
      }
})

module.exports = router;