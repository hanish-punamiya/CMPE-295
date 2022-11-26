import mongoose from "mongoose";
import Category from "./category.js";

const Schema = mongoose.Schema;

const newsSchema = Schema(
  {
    text: {
      type: String,
    },
    sourceName: {
      type: String,
    },
    sourceUrl: {
      type: String,
    },
    urls: [
      {
        type: String,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    breaking: {
      type: Boolean,
    },
    tweet_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

export default News;
