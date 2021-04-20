import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import passport from "passport";
import User from "./models/User";

const app = express();
dotenv.config();
import "./db";
import "./models/User";

// 앱 세팅
app.use(helmet());
app.use(morgan("dev"));
app.set("view engine", "pug");
app.use("/public", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 라우터
app.get("/", (req, res) => res.render("index"));
app.use("/user", userRouter);

// 서버 연결
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ ${PORT}포트에서 서버 가동 중!`);
});
