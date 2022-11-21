import mongoose from "mongoose";
import News from "./news.js";
import Category from "./category.js";

const Schema = mongoose.Schema;

const userSchema = Schema({
  first_name: {
    type: String,
    // required: true
  },
  last_name: String,
  email: {
    type: String,
    // required: true,
    max: 255,
  },
  password: {
    type: String,
    // required: true,
    max: 1024,
    min: 6,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: "News",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
