import mongoose from "mongoose";
import Category from "./category.js";

const Schema = mongoose.Schema;

const userSchema = Schema({
  text: {
    type: String,
    // required: true
  },
  source: {
    type: String,
    // required: true,
    // max: 255
  },
  link: {
    type: String,
    // required: true,
    // max: 255
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const News = mongoose.model("News", userSchema);

export default News;
