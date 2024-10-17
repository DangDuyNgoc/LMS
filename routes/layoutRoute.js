import express from "express";
import { authorizeRole, isAuthenticated } from "../middlewares/authMiddleware.js";
import { createLayout } from "../controllers/layoutController.js";

const layoutRoute = express.Router();

layoutRoute.post(
  "/create-layout",
  isAuthenticated,
  authorizeRole("admin"),
  createLayout
);

export default layoutRoute;