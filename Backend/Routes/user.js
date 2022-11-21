import { Router } from "express";
import { updateUser, addFavourite, removeFavourite } from "../Services/user.js";
import {
  subscribeToCategories,
  unsubscribeFromCategories,
} from "../Services/category.js";

const router = Router();

router.post("/updateuser", updateUser);
router.post("/addfavouritenews", addFavourite);
router.post("/removefavouritenews", removeFavourite);
router.post("/subscribecategories", subscribeToCategories);
router.post("/unsubscribecategories", unsubscribeFromCategories);

export default router;
