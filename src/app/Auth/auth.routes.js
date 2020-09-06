import express from "express";
import AuthController from './auth.controller';

const router = express.Router();
const authController = new AuthController();

router.get("/register", authController.call('register'))

export default router;