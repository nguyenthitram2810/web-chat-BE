import express from "express";
import logger from "morgan";
import methodOverride from "method-override";
import cors from "cors";
import http from 'http';
import initRoutes from '../routes/index';
import connectDB from '../database/connection';
import Model from '../database/models/index';
import configSocket from '../config/socket';

export default (app) => {
    const server = http.createServer(app);
    configSocket(server);
    app.use(logger("dev"));
    app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	
    app.use(methodOverride("X-HTTP-Method-Override"));
    app.use(methodOverride((req) => {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
            const method = req.body._method;
            delete req.body._method;

            return method;
        }

        return undefined;
    }));
    connectDB();
    
    app.use("/api/v1", initRoutes);
    app.use("*", (req, res) => res.status(404).json({
					status: 404,
					message: "Not found",
    }));
    server.listen(5000)
};