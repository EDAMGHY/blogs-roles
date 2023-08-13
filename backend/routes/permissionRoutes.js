import express from "express";
import {
  getPermissions,
  getPermission,
  deletePermission,
} from "../controllers/permissionController.js";
import { protect, checkPermissions } from "../middleware/index.js";
import {
  GET_PERMISSION,
  DELETE_PERMISSION,
  GET_PERMISSIONS,
} from "../utils/index.js";

const router = express.Router();

router.get(
  "/",
  protect,
  checkPermissions({ permissionNames: [GET_PERMISSIONS] }),
  getPermissions
);

router.get(
  "/:id",
  protect,
  checkPermissions({ permissionNames: [GET_PERMISSION] }),
  getPermission
);

router.delete(
  "/:id/delete",
  protect,
  checkPermissions({ permissionNames: [DELETE_PERMISSION] }),
  deletePermission
);

export default router;
