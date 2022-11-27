import { Router } from "express";
import { acceptNews, getBreakingNews, getCategoryNews, getNews, getFilteredNews, getTopNews } from "../Services/news.js";

const router = Router();

router.get("/getnews", getNews);
router.get("/getbreakingnews", getBreakingNews);
// router.post("/acceptnews", acceptNewsTest);//cmpe295-75b2f
router.post("/acceptnews", acceptNews);//cmpe295-75b2f
router.post("/getcategorynews", getCategoryNews);
router.post("/getfilterednews", getFilteredNews);
router.get("/gettopnews", getTopNews);

export default router;
