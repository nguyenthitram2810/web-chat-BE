import express from "express";

import initApp from "./config/initApp";
import "dotenv/config";

const app = express();

initApp(app);

export default app;