const mongoose = require("mongoose");
const user = require("./user");
const Schema = mongoose.Schema;

const BlogPost = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    ref: user
  },
  title: { type: String, required: true },
  banner: { type: String, required: true },
  author: { type: String, required: true },
  desc: { type: String, required: true },
  content: { type: [], required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", BlogPost);
