const express = require("express")
const helmet = require("helmet")
const apiRouter = require('./api/apiRouter')

const server = express()

server.use(helmet())
server.use(express.json())
server.use("/api", apiRouter)


const port = process.env.PORT || 5000

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})