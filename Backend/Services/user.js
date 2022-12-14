import User from "../Models/user.js";
// import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { hashPassword, validatePassword } from "../Utilities/hashing.js";
import Category from "../Models/category.js";
import { getCategoryIdFromName, addUserToCategory } from "./category.js";

//Registers a new user.
export const addUser = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 201;
  try {
    if (!(await checkUser(req.body.email))) {
      const user = createEmptyUSer();
      user.email = req.body.email;
      const password = await hashPassword(req.body.password);
      user.password = password;
      user.name = req.body.name;

      const categoryIds = [];
      if (req.body.categories) {
        for (const categoryName of req.body.categories) {
          const categoryId = await getCategoryIdFromName(categoryName);
          if (categoryId) categoryIds.push(categoryId);
        }
      }
      user.categories = categoryIds;
      let savedUser = await user.save();
      await savedUser.populate("categories", "-news");

      for (const categoryId of categoryIds) {
        await addUserToCategory(savedUser._id, categoryId);
      }

      data = { savedUser };
    } else {
      error = "Email Id is already registered!";
      statusCode = 409;
    }
  } catch (err) {
    console.log(err);
    error = err;
    statusCode = 400;
  }
  res.status(statusCode).json({
    data,
    error,
  });
};

// Authorizes user for login
export const authUser = async (req, res) => {
  let auth = false;
  let data = null;
  let error = null;
  let statusCode = 200;
  try {
    const email = req.body.email;
    if (!email) return res.status(400);
    const user = await checkUser(email);
    if (user) {
      if (await validatePassword(req.body.password, user.password)) {
        auth = true;
        await (
          await user.populate("categories", "-news")
        ).populate("favourites");
        data = { user };
      } else {
        statusCode = 401;
        error = "Incorrect Credentials";
      }
    } else {
      error = "Email not found";
      statusCode = 404;
    }
  } catch (err) {
    console.log(err);
    statusCode = 500;
    auth = false;
    error = err;
  }
  res.status(statusCode).json({
    data,
    error,
    auth,
  });
};

export const getUser = async (req, res) => {
  let auth = false;
  let data = null;
  let error = null;
  let statusCode = 200;
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId)
      .populate("categories", "-news")
      .populate({
        path: "favourites",
        populate: { path: "category", select: "name" },
      });
    data = { user };
  } catch (err) {
    console.log(err);
    statusCode = 500;
    auth = false;
    error = err;
  }
  res.status(statusCode).json({
    data,
    error,
    auth,
  });
};

export const updateUser = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    const userId = req.body.userId;
    //   const user = await User.findById(userId);
    const user = {
      first_name: req.body.firstName,
      last_name: req.body.lastname,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      favourites: req.body.favourites,
      categories: req.body.categories,
    };

    console.log(user);
    const updatedUser = await User.updateOne(
      {
        _id: req.body.userId,
      },
      {
        $set: user,
      }
    );

    data = { updatedUser };
  } catch (err) {
    error = err;
    statusCode = 500;
  }
  res.status(statusCode).json({
    data,
    error,
  });
};

export const addFavourite = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    const userId = req.body.userId;
    const favouriteNewsId = req.body.newsId;
    const update = { $addToSet: { favourites: [favouriteNewsId] } };
    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });

    data = { updatedUser };
  } catch (err) {
    error = err;
    statusCode = 500;
  }
  res.status(statusCode).json({
    data,
    error,
  });
};

export const removeFavourite = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 200;

  try {
    const userId = req.body.userId;
    const favouriteNewsId = req.body.newsId;
    const update = { $pull: { favourites: favouriteNewsId } };
    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });

    data = { updatedUser };
  } catch (err) {
    error = err;
    statusCode = 500;
  }
  res.status(statusCode).json({
    data,
    error,
  });
};

export const addCategoryToUser = async (categoryId, userId) => {
  try {
    const update = { $push: { categories: categoryId } };
    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });
    console.log("add: updated user: " + updatedUser);
    return updatedUser;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const removeCategoryFromUser = async (categoryId, userId) => {
  try {
    const update = { $pull: { categories: categoryId } };
    const updatedUser = await User.findByIdAndUpdate(userId, update, {
      new: true,
    });
    console.log("remove: updated user: " + updatedUser);
    return updatedUser;
  } catch (err) {
    console.log(err);
  }
  return null;
};

export const checkUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user) return user;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createEmptyUSer = () => {
  const user = new User({
    name: "",
    email: "",
    password: "",
    categories: [],
    favourites: [],
    // profile_picture: "",
    // phone_number: "",
    // time_zone: "",
    // language: "",
    // currency: "",
    // groups: [],
    // invitations: [],
    // date: ""
  });
  return user;
};

export const copyUSer = (oldUser, newUser) => {
  oldUser.first_name = newUser.first_name;
  oldUser.last_name = newUser.last_name;
  oldUser.email = newUser.email;
  oldUser.categories = newUser.categories;
  oldUser.favourites = newUser.favourites;
  // oldUser.profile_picture = newUser.profile_picture;
  // oldUser.time_zone = newUser.time_zone;
  // oldUser.language = newUser.language;
  // oldUser.currency = newUser.currency;
  // const user = new User({
  //     first_name: "",
  //     last_name: "",
  //     email: "",
  //     password: "",
  //     profile_picture: "",
  //     phone_number: "",
  //     time_zone: "",
  //     language: "",
  //     groups: [],
  //     invitations: [],
  //     date: ""
  // });
  return oldUser;
};
