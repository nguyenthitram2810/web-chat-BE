import express from "express";
import authRouter from "../app/Auth/auth.routes"
import userRouter from "../app/User/user.routes"
import conversationRouter from "../app/Conversation/conversation.routes"
import messageRouter from "../app/Message/message.routes"

const router = express.Router();

router.use(authRouter)
router.use(userRouter)
router.use(conversationRouter)
router.use(messageRouter)

router.get("/test", async (req, res) => {
    return res.json({
        message: "Test!!"
    })
})

export default router;