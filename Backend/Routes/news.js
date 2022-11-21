import { Router } from "express";
import { getNews } from "../Services/news.js";

const router = Router();

router.post("/getnews", getNews);
// router.post("/addfavouritenews", addFavourite);
// router.post("/removefavouritenews", removeFavourite);
// router.post("/subscribecategories", subscribeToCategories);
// router.post("/unsubscribecategories", unsubscribeFromCategories);

export default router;