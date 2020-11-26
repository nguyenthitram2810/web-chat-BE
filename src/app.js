import express from "express";

import initApp from "./config/initApp";
import env from 'dotenv';

const app = express();
env.config();
initApp(app);

export default app;