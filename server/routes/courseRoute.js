import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  getAllCourse,
  getCourseByUser,
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

courseRoute.get("/get-course-content/:id", isAuthenticated, getCourseByUser);

courseRoute.post("/add-question", isAuthenticated, addQuestion);

courseRoute.post("/add-answer", isAuthenticated, addAnswer);

courseRoute.post("/add-review/:id", isAuthenticated, addReview);

courseRoute.post("/add-reply", isAuthenticated, addReplyToReview);

export default courseRoute;
