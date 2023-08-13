import expressHandler from "express-async-handler";
import { Permission, Role } from "../models/index.js";

// @desc GET all Roles
// @route GET /api/roles
// @access Private
// @role Owner
const getRoles = expressHandler(async (req, res) => {
  const roles = await Role.find({}).populate({ path: "permissions" });
  res.status(200).json({
    error: false,
    data: {
      count: roles.length,
      result: roles,
    },
    message: "All Roles Fetched...",
  });
});

// @desc GET a Role
// @route GET /api/roles/{id}
// @access Private
// @role Owner
const getRole = expressHandler(async (req, res) => {
  const { id } = req.params;
  const role = await Role.findById(id);

  if (!role) {
    res.status(404);
    throw new Error(`There is no User with this ID ${id}...`);
  }

  res.status(200).json({
    error: false,
    data: {
      count: null,
      result: role,
    },
    message: `Role with the ID: ${id} Fetched...`,
  });
});
// @desc Add a Role
// @route POST /api/roles
// @access Private
// @role Owner
const addRole = expressHandler(async (req, res) => {
  const { name, permissions = [] } = req.body;

  // TODO NOT showing the other guest permissions
  const perms = [
    ...permissions,
    ...(await Permission.find({
      $or: [
        { $or: [{ name: { $regex: /BLOG/ } }] },
        { $or: [{ name: "EDIT_USER" }, { name: "DELETE_USER" }] },
      ],
    })),
  ];

  const role = await Role({
    name: name?.toLowerCase().trim(),
    permissions: perms,
  });

  await role.save();

  res.status(201).json({
    error: false,
    data: { count: null, result: role },
    message: "Role Added Successfully",
  });
});

// @desc Edit a Role
// @route PUT /api/roles/{id}/edit
// @access Private
// @role Owner
const editRole = expressHandler(async (req, res) => {
  const { name, permissions = [] } = req.body;
  const { id } = req.params;
  const role = await Role.findById(id);

  if (!role) {
    res.status(404);
    throw new Error(`There is no User with this ID ${id}...`);
  }
  const perms = permissions || role.permissions;

  await Role.updateOne({ _id: id }, { $set: { name, permissions: perms } });

  const editedRole = await Role.findById(id);

  res.status(200).json({
    error: false,
    data: { count: null, result: editedRole },

    message: "Role Updated Successfully",
  });
});

// @desc Delete a Role
// @route DELETE /api/roles/{id}/delete
// @access Private
// @role Owner
const deleteRole = expressHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findByIdAndDelete(id);

  if (!role) {
    res.status(404);
    throw new Error(`There is no Role with this ID ${id}...`);
  }

  res
    .status(200)
    .json({ error: false, data: null, message: "Role Deleted Successfully " });
});

export { getRoles, getRole, editRole, deleteRole, addRole };
