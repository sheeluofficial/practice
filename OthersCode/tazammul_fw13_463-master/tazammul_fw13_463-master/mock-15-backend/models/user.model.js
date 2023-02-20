const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    score: { type: String, required: true },
    difficulty: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


module.exports = model("user",userSchema);