import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import {
  connectDB,
  addPermissions,
  addGuestRole,
  addOwnerRole,
} from "./config/index.js";
import { errorHandler, notFound } from "./middleware/index.js";
import {
  authRoutes,
  permissionRoutes,
  roleRoutes,
  userRoutes,
  blogRoutes,
} from "./routes/index.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

connectDB();
// addPermissions();
// addGuestRole();
// addOwnerRole();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "API Running..." });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/blogs", blogRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
