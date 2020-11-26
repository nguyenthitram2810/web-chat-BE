import express from "express";

import initApp from "./config/initApp";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors("*"));
initApp(app);

export default app;