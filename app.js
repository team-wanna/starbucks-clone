import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import "./db";

const app = express();
dotenv.config();

// 앱 세팅
app.use(helmet());
app.use(morgan("dev"));
app.set("view engine", "pug");
app.use("/public", express.static("public"));

// 라우터
app.get("/", (req, res) => res.render("index"));

// 서버 연결
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ ${PORT}포트에서 서버 가동 중!`);
});
