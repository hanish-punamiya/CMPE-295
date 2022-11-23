import { Router } from "express";
import { acceptNews, getBreakingNews, getCategoryNews, getNews } from "../Services/news.js";

const router = Router();

router.get("/getnews", getNews);
router.get("/getbreakingnews", getBreakingNews);
router.post("/acceptnews", acceptNews);//cmpe295-75b2f
router.post("/getcategorynews", getCategoryNews);
// router.post("/getcategoriesnews", getCategoriesNews);

export default router;
