import express from "express";
import {
  activeUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updateUserAvatar,
  updateUserInfo,
  updateUserPassword,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const userRoute = express.Router();

userRoute.post("/registration", registrationUser);
userRoute.post("/activate-user", activeUser);
userRoute.post("/login-user", loginUser);
userRoute.post("/logout", isAuthenticated, logoutUser);
userRoute.post("/refresh-token", updateAccessToken);
userRoute.get("/me", isAuthenticated, getUserInfo);
userRoute.post("/social-auth", isAuthenticated, socialAuth);
userRoute.put("/update-user", isAuthenticated, updateUserInfo);
userRoute.put("/update-password", isAuthenticated, updateUserPassword);
userRoute.put("/update-avatar", isAuthenticated, updateUserAvatar);

export default userRoute;
