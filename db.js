import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db = mongoose.connection;

mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

db.once("open", () => {
  console.log(`✅ 디비 연결 성공!`);
});
db.on("error", (err) => {
  console.log(`❌ 디비 연결 실패: ${err}`);
});
