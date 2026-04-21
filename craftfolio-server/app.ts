import express from "express";
import cors from "cors";
import passport from "passport";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { contextMiddleware } from "./src/middleware/contextMiddleware.js";

dotenv.config();

const app = express();
app.set('trust proxy', true);

import authRoutes from "./src/features/auth/auth.routes.js";
import templateRoutes from "./src/features/templates/template.routes.js";

// Middlewares
app.use(contextMiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);

export default app;