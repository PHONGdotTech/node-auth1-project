const express = require("express");
const authRouter = require('./routers/auth/authRouter')
const userRouter = require("./routers/users/userRouter")

const router = express.Router();

router.use('/auth', authRouter)
router.use("/users", userRouter);

module.exports = router;