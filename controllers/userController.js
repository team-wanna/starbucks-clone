import User from "../models/User";

// Get
export const output = {
  join: (req, res) => res.render("join"),
  login: (req, res) => res.render("login"),
  my: (req, res) => res.send("my page"),
};

// Post
export const process = {
  join: async (req, res) => {
    try {
      const {
        id,
        pwd,
        name,
        gender,
        year,
        month,
        day,
        calendar,
        phone,
        email,
        nickname,
      } = req.body;
      const birth = String(year) + String(month) + String(day) + calendar;
      // 회원 생성 후 로그인 페이지 이동
      const user = await User({
        id,
        name,
        gender,
        birth,
        phone,
        email,
        nickname,
      });
      await User.register(user, pwd);
      res.redirect("/user/login");
    } catch (err) {
      console.log(err);
    }
  },

  login: (req, res) => {
    const { id, pwd } = req.body;
  },

  logout: (req, res) => {},
};
