import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import userRouter from "./routers/userRouter";

const app = express();
dotenv.config();
import "./db";

// 앱 세팅
app.use(helmet());
// app.use(morgan("dev"));
app.set("view engine", "pug");
app.use("/public", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "foo",
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
  })
);

// 로그인 사용자 Check
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  return next();
});

// 라우터
app.get("/", (req, res) => res.render("index", { title: "index" }));
app.use("/user", userRouter);

// 서버 연결
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ ${PORT}포트에서 서버 가동 중!`);
});
