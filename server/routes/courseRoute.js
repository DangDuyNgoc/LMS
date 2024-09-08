import express from "express";
import {
  getAllCourse,
  getSingleCourse,
  updateCourse,
  uploadCourse,
} from "../controllers/courseController.js";
import {
  authorizeRole,
  isAuthenticated,
} from "../middlewares/authMiddleware.js";

const courseRoute = express.Router();

courseRoute.post(
  "/create-course",
  isAuthenticated,
  authorizeRole("admin"),
  uploadCourse
);

courseRoute.put(
  "/update-course/:id",
  isAuthenticated,
  authorizeRole("admin"),
  updateCourse
);

courseRoute.get("/get-course/:id", getSingleCourse);

courseRoute.get("/get-course", getAllCourse);

export default courseRoute;
