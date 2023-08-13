import mongoose from "mongoose";

const PermissionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      validate: {
        validator: async function (value) {
          const permission = await this.constructor.findOne({ name: value });
          return !permission; // Return true if the email is unique
        },
        message: "Permission Name already exists.",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
  },

  { timestamps: true }
);

const Permission = mongoose.model("Permission", PermissionSchema);
export default Permission;
