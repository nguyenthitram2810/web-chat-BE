import express from "express";
import MessageHandler from './message.handler';

const router = express.Router();

router.post("/sendMessage", MessageHandler["sendMessage"]());
export default router;