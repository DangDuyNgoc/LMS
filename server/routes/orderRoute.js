import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/create-order", isAuthenticated, createOrder);

export default orderRoute;
