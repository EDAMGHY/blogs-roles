import express from "express";
import {
  getRoles,
  editRole,
  getRole,
  deleteRole,
  addRole,
} from "../controllers/roleController.js";
import { checkPermissions, protect } from "../middleware/index.js";

import {
  DELETE_ROLE,
  GET_ROLES,
  EDIT_ROLE,
  GET_ROLE,
  ADD_ROLE,
} from "../utils/index.js";

const router = express.Router();

router
  .route("/")
  .post(protect, checkPermissions({ permissionNames: [ADD_ROLE] }), addRole)
  .get(protect, checkPermissions({ permissionNames: [GET_ROLES] }), getRoles);

router.get(
  "/:id",
  protect,
  checkPermissions({ permissionNames: [GET_ROLE] }),
  getRole
);

router.put(
  "/:id/edit",
  protect,
  checkPermissions({ permissionNames: [EDIT_ROLE] }),
  editRole
);

router.delete(
  "/:id/delete",
  protect,
  checkPermissions({ permissionNames: [DELETE_ROLE] }),
  deleteRole
);

export default router;
