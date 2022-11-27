import { Router } from "express";
import { getUser, addFavourite, removeFavourite, addUser, authUser } from "../Services/user.js";
import {updateCategories} from "../Services/category.js";

const router = Router();

router.post("/createuser", addUser);
router.post("/authuser", authUser);
router.post("/updateusercategories", updateCategories);
router.post("/addfavouritenews", addFavourite);
router.post("/removefavouritenews", removeFavourite);
router.post("/getuser", getUser);

export default router;
