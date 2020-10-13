import express from "express";
import UserHandler from './user.handler';

const router = express.Router();

router.post("/searchFriend", UserHandler["searchFriend"]());
export default router;