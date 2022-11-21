import Category from "../Models/category.js";



export const unsubscribeFromCategories = async (req, res) => {
    let data = null;
    let error = null;
    let statusCode = 200;
  
    try {
      const userId = req.body.userId;
      const categoryId = req.body.categoryId;
      const user = await User.findById(userId);
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $pull: {
          categories: categoryId,
        },
      });

      const updatedCategory = await User.findByIdAndUpdate(categoryId, {
        $pull: {
          users: userId,
        },
      });

      data = { updatedUser, updatedCategory };
    } catch (err) {
      error = err;
      statusCode = 500;
    }
    res.status(statusCode).json({
      data,
      error,
    });
  };