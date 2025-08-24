import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware.js";
dotenv.config({
  path: ".env",
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routers

import userRouter from "./routes/user.route.js";
import tweetRouter from "./routes/Tweet.route.js";
import likeRouter from "./routes/Like.routes.js";
import subscribeRouter from "./routes/SubScription.route.js";
import commentRouter from "./routes/Comment.routes.js";

app.use("/api/users", userRouter);
app.use("/api/tweet", tweetRouter);
app.use("/api/like", likeRouter);
app.use("/api/follow", subscribeRouter);
app.use("/api/comment", commentRouter);

app.use(errorHandler);

export { app };
