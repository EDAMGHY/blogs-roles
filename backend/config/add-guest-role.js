import { Role, Permission } from "../models/index.js";

const addGuestRole = async () => {
  try {
    const checkRole = await Role.findOne({ name: "guest" });

    if (checkRole) {
      console.log("Role Guest Already Exists...");
      return;
    }

    const permissions = await Permission.find({
      $or: [
        { $or: [{ name: { $regex: /BLOG/ } }] },
        { $or: [{ name: "EDIT_USER" }, { name: "DELETE_USER" }] },
      ],
    });

    if (permissions.length === 0) {
      console.log("Permissions collection is Empty...");
      return;
    }

    await Role.create({
      name: "guest",
      permissions: permissions.map((permission) => permission._id),
    });
    console.log("Role Guest Added Successfully...");
  } catch (error) {
    console.error("Error while seeding data:", error);
  }
};

export default addGuestRole;
