import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { Role, User } from "../models/index.js";

const protect = asyncHandler(async (req, res, next) => {
  let token = req?.cookies["blog_auth_jwt"] || null;
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId)
      .select("-password")
      .populate({ path: "role" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not Authorized, invalid token");
  }
});

export default protect;
