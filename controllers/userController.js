import User from "../models/User";

// Get
export const output = {
  join: (req, res) => res.render("join", { title: "join" }),
  login: (req, res) => res.render("login", { title: "login" }),
  my: (req, res) => res.render("myStarbucks", { title: "myStarbucks" }),
};

// Post
export const process = {
  join: async (req, res) => {
    try {
      const {
        id,
        pwd,
        pwd2,
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

      if (pwd != pwd2) {
        // 추가 구현 필요함
        res.status(400).send("비밀번호 불일치");
      } else {
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
      }
    } catch (err) {
      console.log(err);
    }
  },

  login: (req, res) => {
    const { id, pwd } = req.body;
  },

  logout: (req, res) => {},
};
