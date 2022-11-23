import mongoose from "mongoose";
import News from "./news.js";
import User from "./user.js";

const Schema = mongoose.Schema;

const categorySchema = Schema({
  name: {
    type: String,
    // required: true
  },
  news: [
    {
      type: Schema.Types.ObjectId,
      ref: "News",
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
