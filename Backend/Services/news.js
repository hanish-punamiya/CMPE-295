import Category from "../Models/category.js";
import News from "../Models/news.js";

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

      // console.log(typeof newsItem.urls)

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

      const categoryName = newsItem.news_category;
      let categoryDetails = null;
      if (categoryName) {
        const filter = { name: categoryName };
        categoryDetails = await Category.findOne(filter);
        if (categoryDetails) {
          news.category = categoryDetails._id;
        }
      }

      let savedNews = await news.save();
      console.log(savedNews);
      savedNewsArray.push(savedNews);

      //check and update news category
      if (categoryDetails) {
        const update = { $push: { news: savedNews._id } };
        const updatedCategory = await Category.findByIdAndUpdate(
          categoryDetails._id,
          update,
          {
            new: true,
          }
        );
        console.log(updatedCategory);
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
