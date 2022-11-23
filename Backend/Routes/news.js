import { Router } from "express";
import { acceptNews } from "../Services/news.js";

const router = Router();

router.post("/acceptnews", acceptNews);
// router.post("/addfavouritenews", addFavourite);
// router.post("/removefavouritenews", removeFavourite);
// router.post("/subscribecategories", subscribeToCategories);
// router.post("/unsubscribecategories", unsubscribeFromCategories);

export default router;