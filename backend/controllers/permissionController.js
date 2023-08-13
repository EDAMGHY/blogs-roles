import expressHandler from "express-async-handler";
import { Permission, Role } from "../models/index.js";

// @desc GET all Permissions
// @route GET /api/permissions
// @access Private
// @role Owner
const getPermissions = expressHandler(async (req, res) => {
  const roleName = req?.user?.role?.name || null;

  const role = await Role.findOne({ name: roleName }).populate({
    path: "permissions",
  });

  if (!role) {
    res.status(404);
    throw new Error(`There is no Role available, Please try again later...`);
  }

  // console.log(permissions);
  res.status(200).json({
    error: false,
    data: {
      count: role?.permissions?.length || 0,
      result: role?.permissions || [],
    },
    message: "All Permissions Fetched ",
  });
});

// @desc GET a Permission
// @route GET /api/permissions/{id}
// @access Private
// @role Owner
const getPermission = expressHandler(async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findById(id);

  if (!permission) {
    res.status(404);
    throw new Error(`There is no Permission With this ID ${id}...`);
  }

  res.status(200).json({
    error: false,
    data: {
      count: null,
      result: permission,
    },
    message: `Permission With the ID ${id} Fetched`,
  });
});

// @desc Delete a Permission
// @route DELETE /api/permissions/{id}/delete
// @access Private
// @role Owner

const deletePermission = expressHandler(async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findByIdAndDelete(id);

  if (!permission) {
    res.status(404);
    throw new Error(`There is no User with this ID ${id}...`);
  }

  res.status(200).json({
    error: false,
    data: null,
    message: "Permission Deleted Successfully",
  });
});

export { getPermissions, getPermission, deletePermission };
