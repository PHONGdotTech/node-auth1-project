const express = require("express")
const helmet = require("helmet")
const apiRouter = require('./api/apiRouter')
const knex = require('./data/dbConfig.js') // needed for storing sessions in the database
const session = require("express-session")
const KnexStore = require('connect-session-knex')(session) // remember to curry and pass the session

const server = express()

const sessionConfig = {
    name: 'monster',
    secret: 'my secret here',
    resave: false,
    saveUninitialized: false, // related to GDPR compliance
    cookie: {
      maxAge: 1000 * 60 * 10, // in milliseconds
      secure: false, // should be true in production
      httpOnly: true, // true means JS cant touch the cookie
    },
    // remember the new keyword
    store: new KnexStore({
      knex: knex,
      tablename: 'sessions',
      createtable: true,
      sidfieldname: 'sid',
      clearInterval: 1000 * 60 * 10, // in milliseconds
    })
  }

server.use(helmet())
server.use(express.json())
server.use(session(sessionConfig)) // req.session is created here
server.use("/api", apiRouter)


const port = process.env.PORT || 5000

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})