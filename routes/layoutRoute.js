import express from "express";
import {
  authorizeRole,
  isAuthenticated,
} from "../middlewares/authMiddleware.js";
import {
  createLayout,
  getLayoutByType,
  updateLayout,
} from "../controllers/layoutController.js";

const layoutRoute = express.Router();

layoutRoute.post(
  "/create-layout",
  isAuthenticated,
  authorizeRole("admin"),
  createLayout
);

layoutRoute.put(
  "/update-layout",
  isAuthenticated,
  authorizeRole("admin"),
  updateLayout
);

layoutRoute.get("/get-layout/:type", getLayoutByType);

export default layoutRoute;