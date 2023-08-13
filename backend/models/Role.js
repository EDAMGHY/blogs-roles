import mongoose from "mongoose";

const RoleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      validate: {
        validator: async function (value) {
          const role = await this.constructor.findOne({ name: value });
          return !role; // Return true if the email is unique
        },
        message: "Role already exists.",
      },
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
  },

  { timestamps: true }
);

const Role = mongoose.model("Role", RoleSchema);
export default Role;
