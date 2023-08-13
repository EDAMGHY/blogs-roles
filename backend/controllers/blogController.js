import expressHandler from "express-async-handler";
import { Blog } from "../models/index.js";
import { v2 as cloudinary } from "cloudinary";
import { getImageName } from "../utils/index.js";

// @desc GET all Blogs
// @route GET /api/blogs
// @access Public
// @role ALL
const getBlogs = expressHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json({
    error: false,
    data: {
      count: blogs.length,
      result: blogs,
    },
    message: "All Blogs Fetched...",
  });
});

// @desc GET all User Blogs
// @route GET /api/blogs/me
// @access Private
// @role Owner & current user
const getUserBlogs = expressHandler(async (req, res) => {
  const user = req?.user?._id;
  const blogs = await Blog.find({ user });

  res.status(200).json({
    error: false,
    data: {
      count: blogs.length || 0,
      result: blogs || [],
    },
    message: "Current User Blogs Fetched...",
  });
});

// @desc GET a Blog
// @route GET /api/blogs/{id}
// @access Public
// @role ALL
const getBlog = expressHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);

  if (!blog) {
    res.status(404);
    throw new Error(`There is no Blog with this ID ${id}...`);
  }

  res.status(200).json({
    error: false,
    data: { count: null, result: blog },
    message: `Blog With ID ${id}`,
  });
});

// @desc Add a Blog
// @route POST /api/blogs
// @access Private
// @role Owner & current user
const addBlog = expressHandler(async (req, res) => {
  const DEFAULT_IMAGE = process.env.DEFAULT_IMAGE;

  const { title, content } = req.body;

  let image = null;
  if (req?.files || req?.files?.image) {
    image = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: "blog-auth-images",
    });
  }

  const blog = await Blog({
    title,
    content,
    image: image?.secure_url || DEFAULT_IMAGE,
    user: req.user._id,
  });

  await blog.save();

  res.status(201).json({
    error: false,
    data: { count: null, result: blog },
    message: `Blog Added Successfully`,
  });
});
// @desc Edit a Blog
// @route PUT /api/blogs/{id}/edit
// @access Private
// @role current user
const editBlog = expressHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const blog = await Blog.findById(id);

  if (!blog) {
    res.status(404);
    throw new Error(`There is no Blog with this ID ${id}...`);
  }

  let image = null;
  if (req?.files || req?.files?.image) {
    image = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
      use_filename: true,
      folder: "blog-auth-images",
    });
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  blog.image = image?.secure_url || blog.image;

  await blog.save();

  res.status(200).json({
    error: false,
    data: { count: null, result: blog },
    message: `Blog Updated Successfully`,
  });
});

// @desc Delete a Blog
// @route DELETE /api/blogs/{id}/delete
// @access Private
// @role Owner & current user
const deleteBlog = expressHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    res.status(404);
    throw new Error(`There is no Blog with this ID ${id}...`);
  }

  const imageName = getImageName(blog?.image);

  await cloudinary.uploader.destroy(imageName);

  res
    .status(200)
    .json({ error: false, data: null, message: "Blog Deleted Successfully " });
});

export { getBlogs, getBlog, addBlog, editBlog, deleteBlog, getUserBlogs };
