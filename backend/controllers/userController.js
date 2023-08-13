import expressHandler from "express-async-handler";
import { User, Blog } from "../models/index.js";
import bcrypt from "bcryptjs";
// @desc GET all Users
// @route GET /api/users
// @access Private
// @role Owner
const getUsers = expressHandler(async (req, res) => {
  const users = await User.find({})
    .select("-password")
    .populate({ path: "role", populate: { path: "permissions" } });
  res.status(200).json({
    error: false,
    data: {
      count: users.length,
      result: users,
    },
    message: "All Users Fetched...",
  });
});

// @desc GET a User
// @route GET /api/users/{id}
// @access Private
// @role Owner
const getUser = expressHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id)
    .select("-password")
    .populate({
      path: "role",
      populate: { path: "permissions" },
    });

  if (!user) {
    res.status(404);
    throw new Error(`There is no User with this ID ${id}...`);
  }

  res.status(200).json({
    error: false,
    data: {
      count: null,
      result: user,
    },
    message: `User with the ID ${id} Fetched...`,
  });
});

// @desc Edit a User
// @route PUT /api/users/{id}/edit
// @access Private
// @role Owner & current user
const editUser = expressHandler(async (req, res) => {
  const { name, username, email, role } = req.body;
  const { id } = req.params;

  const user = await User.findById(id).select("-password").populate({
    path: "role",
  });

  if (!user) {
    res.status(404);
    throw new Error(`There is no User with this ID ${id}...`);
  }

  await User.updateOne({ _id: id }, { $set: { name, username, email, role } });

  const updatedUser = await User.findById(id).select("-password").populate({
    path: "role",
  });

  if (!updatedUser) {
    res.status(404);
    throw new Error(`There is no User with this ID ${id}...`);
  }

  res.status(200).json({
    error: false,
    data: {
      count: null,
      result: updatedUser,
    },
    message: `User Updated Successfully...`,
  });
});

// @desc Change User Password
// @route PUT /api/users/password/edit
// @access Private
// @role Current user
const changePassword = expressHandler(async (req, res) => {
  const { password, newPassword } = req.body;

  const id = req?.user?._id || null;

  if (!password || !newPassword) {
    res.status(400);
    throw new Error(`Please fill all the fields...`);
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error(`There is no User with this ID ${id}...`);
  }

  if (newPassword.length < 8) {
    res.status(400);
    throw new Error(`Password must be at least 8 characters long`);
  }

  // Validate current password
  const isMatch = await user.matchPasswords(password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Your Password is incorrect");
  }

  // Update password
  const salt = await bcrypt.genSalt(10);
  const pwd = await bcrypt.hash(newPassword, salt);
  await User.updateOne({ _id: id }, { $set: { password: pwd } });

  res.status(200).json({
    error: false,
    data: null,
    message: "Password Changed Successfully",
  });
});

// @desc Delete a User
// @route DELETE /api/users/{id}/delete
// @access Private
// @role Owner & current user
const deleteUser = expressHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  await Blog.deleteMany({ user: req.user._id });

  if (!user) {
    res.status(404);
    throw new Error(`There is no User with this ID ${id}...`);
  }

  res
    .status(200)
    .json({ error: false, data: null, message: "User Deleted Successfully" });
});

export { getUsers, changePassword, getUser, editUser, deleteUser };
