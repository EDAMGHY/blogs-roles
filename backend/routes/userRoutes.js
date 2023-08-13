import express from "express";
import {
  getUsers,
  editUser,
  getUser,
  deleteUser,
  changePassword,
} from "../controllers/userController.js";
import { checkPermissions, protect } from "../middleware/index.js";
import { DELETE_USER, EDIT_USER, GET_USERS, GET_USER } from "../utils/index.js";

const router = express.Router();

router.get(
  "/",
  protect,
  checkPermissions({ permissionNames: [GET_USERS] }),
  getUsers
);

router.put(
  "/password/edit",
  protect,
  checkPermissions({ permissionNames: [EDIT_USER] }),
  changePassword
);

router.get(
  "/:id",
  protect,
  checkPermissions({ permissionNames: [GET_USER] }),
  getUser
);

router.put(
  "/:id/edit",
  protect,
  checkPermissions({ permissionNames: [EDIT_USER] }),
  editUser
);

router.delete(
  "/:id/delete",
  protect,
  checkPermissions({ permissionNames: [DELETE_USER] }),
  deleteUser
);

export default router;
