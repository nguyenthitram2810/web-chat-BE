import express from "express";
import authRouter from "../app/Auth/auth.routes"

const router = express.Router();

router.use(authRouter)

router.get("/test", async (req, res) => {
    return res.json({
        message: "Test!!"
    })
})

export default router;