import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./Models/user.js";
import authRoutes from "./Routes/auth.js";
import notificationRoutes from "./Routes/notification.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(session({
//     secret: process.env.TOKEN_SECRET,
//     resave: true,
//     saveUninitialized: true
// }))

// app.use(cookieParser(process.env.TOKEN_SECRET))

// app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notify", notificationRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/note', noteRoutes);
// app.use('/api/transaction', transactionRoutes);
app.get("/", (req, res) => {
  res.send("You are on home");
  //console.log("You are on home")
});

async function mongoConnect() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`User hanish connected to DB`);
  } catch (error) {
    console.log(error);
  }
}

mongoConnect();
app.listen(process.env.PORT, () =>
  console.log(`server started on port ${process.env.PORT}`)
);
