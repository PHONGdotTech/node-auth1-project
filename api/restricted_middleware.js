// const bcrypt = require("bcryptjs")
// const Users = require("./routers/users/userModel")

module.exports = (req,res,next) => {
    // if (req.headers.username && req.headers.password) {
    //     Users.findBy({username: req.headers.username})
    //     .then(user => {
    //         if (user && bcrypt.compareSync(req.headers.password, user.password)){
    //             next()
    //         } else {
    //             res.status(401).json({message: "Invalid Credentials."})
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json({name, message, stack})
    //     })
    // } else {
    //     res.status(401).json({message: "Missing credentials in header."})
    // }
    console.log("using restricted middleware.")
    console.log(req.session)
    if (req.session && req.session.loggedIn){
        console.log('Middleware passed. Session exists and loggedIn=true')
        next()
    } else {
        console.log('Middleware failed. session doesnt exist or you are not logged in.')
        res.status(401).json({message: "You must be logged in."})
    }
}