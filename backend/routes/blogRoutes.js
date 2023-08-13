import express from "express";
import {
  getBlogs,
  editBlog,
  getBlog,
  deleteBlog,
  addBlog,
  getUserBlogs,
} from "../controllers/blogController.js";
import { protect, checkPermissions } from "../middleware/index.js";
import {
  ADD_BLOG,
  GET_USER_BLOGS,
  DELETE_BLOG,
  EDIT_BLOG,
} from "../utils/index.js";

const router = express.Router();

router
  .route("/")
  .post(protect, checkPermissions({ permissionNames: [ADD_BLOG] }), addBlog)
  .get(getBlogs);

router.get(
  "/me",
  protect,
  checkPermissions({ permissionNames: [GET_USER_BLOGS] }),
  getUserBlogs
);

router.get("/:id", getBlog);

router.put(
  "/:id/edit",
  protect,
  checkPermissions({ permissionNames: [EDIT_BLOG] }),
  editBlog
);

router.delete(
  "/:id/delete",
  protect,
  checkPermissions({ permissionNames: [DELETE_BLOG] }),
  deleteBlog
);

export default router;
