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
    tweetUrl: {
      type: String,
    },
    retweetCount: {
      type: String,
    },
    likeCount: {
      type: String,
    },
    replyCount: {
      type: String,
    },
    quoteCount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

export default News;
