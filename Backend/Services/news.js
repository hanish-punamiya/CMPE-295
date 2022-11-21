import Category from "../Models/category.js";
import News from "../Models/news.js";

export const getNews = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    const newsArray = req.body;
    // console.log(newsArray);
    const savedNewsArray = [];
    for (const newsItem of newsArray) {
      let news = new News();
      //save the new news
      news.text = newsItem.text;
      news.source = newsItem.source;
      news.link = newsItem.link;
      let savedNews = await news.save();
      console.log(savedNews);
        
      //check and update news category
      if (newsItem.categories) {
        const newsCategories = [];
        for (const categoryName of newsItem.categories) {
          const filter = { name: categoryName };
          const update = { $push: { news: savedNews._id } };
          const updatedCategory = await Category.findOneAndUpdate(
            filter,
            update,
            { new: true, upsert: true, rawResult: true }
          );
          console.log(updatedCategory);
          newsCategories.push(updatedCategory.value._id);
        }

        // update the saved news to add the saved categories
        savedNews = await News.findByIdAndUpdate(savedNews._id, {
          categories: newsCategories,
        });
        savedNewsArray.push(savedNews);
        console.log(savedNews);
      }
    }

    data = { savedNewsArray };
  } catch (err) {
    error = err;
    statusCode = 500;
  }
  res.status(statusCode).json({
    data,
    error,
  });
};
