import User from "../Models/user.js";
// import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { hashPassword, validatePassword } from "../Utilities/hashing.js";

//Registers a new user.
export const addUser = async (req, res) => {
  let data = null;
  let error = null;
  let statusCode = 201;
  try {
    if (!(await checkUser(req.body.email))) {
      const user = createEmptyUSer();
      console.log(req.body);
      user.email = req.body.email;
      const password = await hashPassword(req.body.password);
      user.password = password;
      const name = req.body.name.split(" ");
      user.first_name = name[0];
      if (name[1]) user.last_name = name[1];
      const savedUser = await user.save();
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
        data = { user };
        // const token = jwt.sign({
        //     _id: user._id
        // }, process.env.TOKEN_SECRET)
        // res.header('auth_token', token);
        // data = {
        //     user,
        //     token
        // };
        // await user.populate("groups").execPopulate();
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
    const user = await User.findById(userId);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $addToSet: {
        favourites: [favouriteNewsId],
      },
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
    const user = await User.findById(userId);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $pull: {
        favourites: favouriteNewsId,
      },
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
    first_name: "",
    last_name: "",
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
