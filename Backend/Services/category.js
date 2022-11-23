import Category from "../Models/category.js";
import User from "../Models/user.js";
import { addCategoryToUser, removeCategoryFromUser } from "./user.js";

export const updateCategories = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    console.log(req.body);
    const userId = req.body.userId;
    const user = await User.findById(userId).populate("categories");
    const updatedCategoryNames = req.body.categories;
    const currentCategoryNames = user.categories.map(
      (category) => category.name
    );
    console.log(currentCategoryNames);
    for (const categoryName of updatedCategoryNames) {
      if (!currentCategoryNames.includes(categoryName)) {
        const categoryId = await getCategoryIdFromName(categoryName);
        await subscribeToCategory(userId, categoryId);
      }
    }

    for (const categoryName of currentCategoryNames) {
      if (!updatedCategoryNames.includes(categoryName)) {
        const categoryId = await getCategoryIdFromName(categoryName);
        await unsubscribeFromCategory(userId, categoryId);
      }
    }

    const updatedUser = await User.findById(userId).populate("categories");

    data = { updatedUser };
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

export const getCategoryIdFromName = async (categoryName) => {
  try {
    if (categoryName) {
      const filter = { name: categoryName };
      const categoryDetails = await Category.findOne(filter);
      if (categoryDetails) {
        return categoryDetails._id;
      }
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const subscribeToCategory = async (userId, categoryId) => {
  try {
    const updatedUser = await addCategoryToUser(categoryId, userId);
    const updatedCategory = await addUserToCategory(userId, categoryId);
    return { updatedUser, updatedCategory };
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const unsubscribeFromCategory = async (userId, categoryId) => {
  try {
    const updatedUser = await removeCategoryFromUser(categoryId, userId);
    const updatedCategory = await removeUserFromCategory(userId, categoryId);
    return { updatedUser, updatedCategory };
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const addNewsToCategory = async (newsId, categoryId) => {
  try {
    const update = { $push: { news: newsId } };
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      update,
      { new: true }
    );
    console.log(updatedCategory);
    return updatedCategory;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const addUserToCategory = async (userId, categoryId) => {
  try {
    const update = { $push: { users: userId } };
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      update,
      {
        new: true,
      }
    );
    console.log("add: updated category: " + updatedCategory);
    return updatedCategory;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const removeUserFromCategory = async (userId, categoryId) => {
  try {
    const update = { $pull: { users: userId } };
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      update,
      {
        new: true,
      }
    );
    console.log("remove: updated category: " + updatedCategory);
    return updatedCategory;
  } catch (err) {
    console.log(err);
  }
  return null;
};
