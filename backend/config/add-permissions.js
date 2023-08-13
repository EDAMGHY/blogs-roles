import { Permission } from "../models/index.js";

const addPermissions = async () => {
  try {
    // Truncate the existing collection
    await Permission.deleteMany();

    // Add your values from the first file here
    const permissions = [
      { name: "GET_USER", description: "Retrieve a user" },
      {
        name: "GET_USERS",
        description: "Retrieve multiple users",
      },
      {
        name: "EDIT_USER",
        description: "Edit a user",
      },
      {
        name: "DELETE_USER",
        description: "Delete a user",
      },
      { name: "GET_ROLE", description: "Retrieve a role" },
      {
        name: "GET_ROLES",
        description: "Retrieve multiple roles",
      },
      { name: "ADD_ROLE", description: "Add a new role" },
      { name: "EDIT_ROLE", description: "Edit a role" },
      { name: "DELETE_ROLE", description: "Delete a role" },
      {
        name: "GET_PERMISSION",
        description: "Retrieve a permission",
      },
      {
        name: "GET_PERMISSIONS",
        description: "Retrieve multiple permissions",
      },
      {
        name: "EDIT_PERMISSION",
        description: "Edit a permission",
      },
      {
        name: "DELETE_PERMISSION",
        description: "Delete a permission",
      },
      {
        name: "GET_BLOG",
        description: "Retrieve a blog",
      },
      {
        name: "GET_BLOGS",
        description: "Retrieve multiple blogs",
      },
      {
        name: "GET_USER_BLOGS",
        description: "Retrieve blogs of a user",
      },
      {
        name: "ADD_BLOG",
        description: "Add a new blog",
      },
      {
        name: "EDIT_BLOG",
        description: "Edit a blog",
      },
      {
        name: "DELETE_BLOG",
        description: "Delete a blog",
      },
    ];

    // Insert the permissions into the database
    await Permission.insertMany(permissions);
    console.log("Permissions Added Successfully...");
  } catch (error) {
    console.error("Error while seeding data:", error);
  }
};

export default addPermissions;
