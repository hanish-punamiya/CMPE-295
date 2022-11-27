import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import User from "./Models/user.js";
import notificationRoutes from "./Routes/notification.js";
import userRoutes from "./Routes/user.js";
import newsRoutes from "./Routes/news.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(
  express.urlencoded({
    limit:"50mb",
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }));
app.use("/api/notify", notificationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/news", newsRoutes);
app.get("/", (req, res) => {
  res.send("You are on home");
});

async function mongoConnect() {
  try {
    await mongoose.connect(`mongodb+srv://hanish:hanish@cluster0.fzmbcsj.mongodb.net/END?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`User hanish connected to DB`);
  } catch (error) {
    console.log(error);
  }
}

mongoConnect();
app.listen(5000, () =>
  console.log(`server started on port 5000`)
);
