import Category from "../Models/category.js";
import News from "../Models/news.js";
import { getCategoryIdFromName, addNewsToCategory } from "./category.js";

export const acceptNews = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    const newsArray = req.body;
    const savedNewsArray = [];
    for (const newsItem of newsArray) {
      const news = new News();

      //save the new news
      news.text = newsItem.display_text;
      news.breaking = newsItem.breaking;
      news.category = null;
      news.sourceName = null;
      news.sourceUrl = null;
      news.urls = [];

      for (const urls of newsItem.entities.urls) {
        if (urls.expanded_url) {
          news.urls.push(urls.expanded_url);
        }
      }

      console.log(news.urls);

      const userDetails = newsItem.user_details;
      if (userDetails) {
        if (userDetails.name) news.sourceName = userDetails.name;
        if (userDetails.user_url) news.sourceUrl = userDetails.user_url;
      }

      console.log(news.sourceName);
      console.log(news.sourceUrl);

      const categoryId = await getCategoryIdFromName(newsItem.news_category);
      console.log(categoryId);

      if (categoryId) news.category = categoryId;

      let savedNews = await news.save();
      console.log(savedNews);
      savedNewsArray.push(savedNews);

      //check and update news category
      if (categoryId) {
        const updatedCategory = await addNewsToCategory(
          savedNews._id,
          categoryId
        );
        if (!updatedCategory) throw "Category not updated successfully";
      }
    }

    data = { savedNewsArray };
  } catch (err) {
    console.log(err);
    error = err;
    statusCode = 500;
  }
  res.status(statusCode).json({
    data,
    error,
  });
};

export const getNews = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    const news = await News.find().populate('category');
    data = { news };
  } catch (err) {
    error = err;
    console.log(error);
    statusCode = 500;
  }
  res.status(statusCode).json({
    data,
    error,
  });
};

export const getCategoryNews = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    const categoryNames = req.body.categories;
    const categoryIds = [];
    for (const categoryName of categoryNames) {
      categoryIds.push(await getCategoryIdFromName(categoryName));
    }
    console.log(categoryIds);
    const news = await News.find({
      category: { $in: categoryIds },
    }).populate("category");
    data = { news };
  } catch (err) {
    error = err;
    console.log(error);
    statusCode = 500;
  }
  res.status(statusCode).json({
    data,
    error,
  });
};

export const getBreakingNews = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    const news = await News.find({ breaking: true }).populate('category');
    data = { news };
  } catch (err) {
    error = err;
    console.log(error);
    statusCode = 500;
  }
  res.status(statusCode).json({
    data,
    error,
  });
};
