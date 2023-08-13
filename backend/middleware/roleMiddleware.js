import asyncHandler from "express-async-handler";
import { Role, User } from "../models/index.js";
import capitalize from "lodash/capitalize.js";
// import { capitalize } from "lodash";

const checkPermissions = ({ permissionNames = [] }) => {
  return asyncHandler(async (req, res, next) => {
    try {
      // protect middleware extracts the user ID from the request -- before checkPermissions --
      const userId = req?.user?._id || null;

      const user = await User.findById(userId).populate({
        path: "role",
        populate: { path: "permissions" },
      });

      if (!user) {
        res.status(401);
        throw new Error("Not Authorized, invalid token");
      }

      let hasPermission = true;

      if (permissionNames.length > 0) {
        // Check if the user has any of the required permissions
        const userPermissions = user.role.permissions.map((p) => p.name);
        hasPermission = userPermissions.some((p) =>
          permissionNames.includes(p)
        );
      }

      if (!hasPermission) {
        const roles = await Role.find({}).populate({ path: "permissions" });
        const names = getRoleNamesWithPermission(roles, permissionNames);

        res.status(403);
        throw new Error(
          `Not Authorized, insufficient Permissions Only '${names
            .map((item) => capitalize(item))
            .join(", ")}' can do this action`
        );
      }

      next();
    } catch (err) {
      next(err);
    }
  });
};

// Function to extract role names with a specific permission
function getRoleNamesWithPermission(data, permissionNames) {
  const roleNames = [];
  for (const role of data) {
    const permissions = role.permissions;
    const hasAllPermissions = permissionNames.every((permissionName) => {
      return permissions.some(
        (permission) => permission.name === permissionName
      );
    });
    if (hasAllPermissions) {
      roleNames.push(role.name);
    }
  }
  return roleNames;
}

export default checkPermissions;
