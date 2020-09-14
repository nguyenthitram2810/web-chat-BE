import express from "express";
import AuthHandler from './auth.handler';

const router = express.Router();

router.post("/signup", AuthHandler["signup"]());
router.post("/signin", AuthHandler["signin"]());

export default router;