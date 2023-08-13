import { Role, Permission } from "../models/index.js";

const addOwnerRole = async () => {
  try {
    const checkRole = await Role.findOne({ name: "owner" });

    if (checkRole) {
      console.log("Role Owner Already Exists...");
      return;
    }

    const permissions = await Permission.find({});

    if (permissions.length === 0) {
      console.log("Permissions collection is Empty...");
      return;
    }

    await Role.create({
      name: "owner",
      permissions: permissions.map((perm) => perm._id),
    });

    console.log("Role Owner Added Successfully...");
  } catch (error) {
    console.error("Error while seeding data:", error);
  }
};

export default addOwnerRole;
