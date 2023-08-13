import expressHandler from "express-async-handler";
import { User, Role } from "../models/index.js";
import { generateToken } from "../utils/index.js";

// @desc Register a User
// @route POST /api/auth/register
// @access Public
const register = expressHandler(async (req, res) => {
  const { name, username, password, email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // set owner role to me
  let roleName = "guest";

  // TODO: remove after testing
  if (username === "edamghy") {
    roleName = "owner";
  }
  if (username === "doejohn") {
    roleName = "admin";
  }

  const guestRole = await Role.findOne({ name: roleName });

  if (!guestRole) {
    res.status(400);
    throw new Error(
      "There is no role available, Please Check the right Roles..."
    );
  }

  const user = await User.create({
    name,
    email,
    username,
    password,
    role: guestRole._id,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid User Data");
  }

  generateToken(res, user?._id);

  res.status(201).json({
    error: false,
    message: "User Registered Successfully...",
    data: {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      username: user?.username,
      createdAt: user.createdAt,
    },
  });
});

// @desc Login/Authenticate a User
// @route POST /api/auth/login
// @access Public
const login = expressHandler(async (req, res) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  const isMatchedPasswords = await user?.matchPasswords(password);

  if (!user || !isMatchedPasswords) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  generateToken(res, user?._id);

  res.status(200).json({
    error: false,
    message: "User Logged in Successfully...",
    data: {
      _id: user?._id,
      name: user?.name,
      email: user?.email,
      username: user?.username,
      createdAt: user.createdAt,
    },
  });
  // res.status(200).json({ message: "Login a User" });
});

// @desc Logout a User
// @route POST /api/auth/logout
// @access Private
const logout = expressHandler(async (req, res) => {
  res.cookie("blog_auth_jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res
    .status(200)
    .json({ error: false, data: null, message: "User Logged out" });
});

// @desc Get logged in User
// @route GET /api/auth/me
// @access Private
const getMe = expressHandler(async (req, res) => {
  const role = await Role.findById(req.user.role);

  const user = {
    _id: req?.user?._id || null,
    name: req?.user?.name || null,
    email: req?.user?.email || null,
    username: req?.user?.username || null,
    createdAt: req?.user?.createdAt || null,
    role: role?.name || null,
  };

  res
    .status(200)
    .json({ error: false, data: user, message: "User Logged out" });
});

export { register, login, logout, getMe };
