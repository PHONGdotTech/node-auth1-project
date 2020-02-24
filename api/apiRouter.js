const express = require("express");
const authRouter = require('./routers/auth/authRouter')
const userRouter = require("./routers/users/userRouter")
const restricted = require("./restricted_middleware")

const router = express.Router();

router.use('/auth', authRouter)
router.use("/users", restricted, userRouter);

module.exports = router;