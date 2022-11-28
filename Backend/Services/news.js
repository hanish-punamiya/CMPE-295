import Category from "../Models/category.js";
import News from "../Models/news.js";
import User from "../Models/user.js";
import { sendMail } from "../Utilities/nodemailer.js";
import { getCategoryIdFromName, addNewsToCategory } from "./category.js";
import { buildEmailHTML, notifyEmail } from "./notification.js";

export const acceptNews = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    const newsArray = req.body;
    const savedNewsArray = [];
    for (const newsItem of newsArray) {
      // const news = new News();

      // //save the new news
      // news.text = "";
      // news.breaking = false;
      // news.category = null;
      // news.sourceName = null;
      // news.sourceUrl = null;
      // news.tweetUrl = null;
      // news.urls = [];
      // news.retweetCount = 0;
      // news.likeCount = 0;
      // news.replyCount = 0;
      // news.quoteCount = 0;

      // if (newsItem.display_text) news.text = newsItem.display_text;
      // if (newsItem.breaking) news.breaking = newsItem.breaking;
      // if (newsItem.tweet_url) news.tweetUrl = newsItem.tweet_url;

      // if (newsItem.entities) {
      //   if (newsItem.entities.urls) {
      //     for (const urls of newsItem.entities.urls) {
      //       if (urls.expanded_url) {
      //         news.urls.push(urls.expanded_url);
      //       }
      //     }
      //   }
      // }

      // console.log(news.urls);

      // const userDetails = newsItem.user_details;
      // if (userDetails) {
      //   if (userDetails.name) news.sourceName = userDetails.name;
      //   if (userDetails.user_url) news.sourceUrl = userDetails.user_url;
      // }

      // console.log(news.sourceName);
      // console.log(news.sourceUrl);

      // if (newsItem.public_metrics) {
      //   if (newsItem.public_metrics.retweet_count)
      //     news.retweetCount = newsItem.public_metrics.retweet_count;
      //   if (newsItem.public_metrics.like_count)
      //     news.likeCount = newsItem.public_metrics.like_count;
      //   if (newsItem.public_metrics.reply_count)
      //     news.replyCount = newsItem.public_metrics.reply_count;
      //   if (newsItem.public_metrics.quote_count)
      //     news.quoteCount = newsItem.public_metrics.quote_count;
      // }

      // let categoryId = null;
      // if (newsItem.news_category) {
      //   categoryId = await getCategoryIdFromName(newsItem.news_category);
      //   console.log(categoryId);
      //   if (categoryId) news.category = categoryId;
      // }

      const news = await setNewsItem(newsItem);
      const categoryId = news.category;

      let savedNews = await news.save();
      await savedNews.populate("category", "-news");
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

    const newsToSend = [];

    for (const savedNewsItem of savedNewsArray) {
      if (savedNewsItem.breaking) newsToSend.push(savedNewsItem);
    }

    if (newsToSend.length) {
      const userList = await User.find();

      if (userList) {
        if (userList.length) {
          // for (const userDetails of userList) {
          //   await notifyEmail(
          //     await buildEmailHTML(newsToSend), userDetails.email
          //   );
          const emailAddresses = [];
          for (const userDetails of userList) {
            emailAddresses.push(userDetails.email);
          }
          const messageBody = await buildEmailHTML(newsToSend);
          await sendMail(messageBody, emailAddresses);
        }
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
    const news = await News.find()
      .populate("category", "-news")
      .limit(300)
      .sort("-createdAt");
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
    console.log(categoryNames);

    const categoryIds = [];
    for (const categoryName of categoryNames) {
      categoryIds.push(await getCategoryIdFromName(categoryName));
    }
    console.log(categoryIds);
    const news = await News.find({
      category: { $in: categoryIds },
    }).populate("category", "-news");
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
    const news = await News.find({ breaking: true }).populate(
      "category",
      "-news"
    );
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

export const getFilteredNews = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    let categories = [];
    let breaking = false;
    console.log(req.body);

    if (req.body.categories) categories = req.body.categories;
    if (req.body.breaking) breaking = req.body.breaking;
    console.log(categories);

    const categoryIds = [];
    for (const categoryName of categories) {
      categoryIds.push(await getCategoryIdFromName(categoryName));
    }
    const filter = {};
    if (categoryIds.length) filter["category"] = { $in: categoryIds };
    if (breaking) filter["breaking"] = true;
    console.log(filter);
    const news = await News.find(filter)
      .populate("category", "-news")
      .limit(500)
      .sort("-createdAt");

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

export const getTopNews = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    // const top = req.body.number;
    const news = await News.find()
      .populate("category", "-news")
      .limit(10)
      .sort({ retweetCount: -1, createdAt: -1 });
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

const setNewsItem = async (newsItem) => {
  const news = new News();

  news.text = "";
  news.breaking = false;
  news.category = null;
  news.sourceName = null;
  news.sourceUrl = null;
  news.tweetUrl = null;
  news.urls = [];
  news.retweetCount = 0;
  news.likeCount = 0;
  news.replyCount = 0;
  news.quoteCount = 0;

  if (newsItem.display_text) news.text = newsItem.display_text;
  if (newsItem.breaking) news.breaking = newsItem.breaking;
  if (newsItem.tweet_url) news.tweetUrl = newsItem.tweet_url;

  if (newsItem.entities) {
    if (newsItem.entities.urls) {
      for (const urls of newsItem.entities.urls) {
        if (urls.expanded_url) {
          news.urls.push(urls.expanded_url);
        }
      }
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

  if (newsItem.public_metrics) {
    if (newsItem.public_metrics.retweet_count)
      news.retweetCount = newsItem.public_metrics.retweet_count;
    if (newsItem.public_metrics.like_count)
      news.likeCount = newsItem.public_metrics.like_count;
    if (newsItem.public_metrics.reply_count)
      news.replyCount = newsItem.public_metrics.reply_count;
    if (newsItem.public_metrics.quote_count)
      news.quoteCount = newsItem.public_metrics.quote_count;
  }

  if (newsItem.news_category) {
    const categoryId = await getCategoryIdFromName(newsItem.news_category);
    console.log(categoryId);
    if (categoryId) news.category = categoryId;
  }

  return news;
};
