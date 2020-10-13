import express from "express";
import ConversationHandler from './conversation.handler';

const router = express.Router();

router.post("/createConversation", ConversationHandler["createConversation"]());
router.get("/listConversations", ConversationHandler["listConversations"]());
router.get("/checkExistConversation", ConversationHandler["checkExistConversation"]());
export default router;