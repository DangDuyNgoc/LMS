import express from "express";
import {
  authorizeRole,
  isAuthenticated,
} from "../middlewares/authMiddleware.js";
import { createOrder, getAllOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();

orderRoute.post("/create-order", isAuthenticated, createOrder);

orderRoute.get(
  "/get-orders",
  isAuthenticated,
  authorizeRole("admin"),
  getAllOrder
);

export default orderRoute;
