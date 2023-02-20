const { Schema, model } = require("mongoose");
const wordSchema = new Schema(
  {
    word: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("dictionary", wordSchema);
