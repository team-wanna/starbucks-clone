import User from '../models/User';
import Suggestion from '../models/Suggestion';
import bcrypt from 'bcrypt';

// Get
export const output = {
  join: (req, res) => res.render('join', { title: 'join' }),
  login: (req, res) => res.render('login', { title: 'login' }),
  my: async (req, res) => {
    if (!req.session.user.isAdmin) {
      const { _id } = req.session.user;
      const suggestions = await Suggestion.find({ owner: _id });
      const completedSuggestions = await Suggestion.find({ owner: _id, status: 'Y' });
      const waitingSuggestions = await Suggestion.find({ owner: _id, status: 'N' });

      return res.render('myStarbucks', {
        title: 'myStarbucks',
        suggestions,
        completedSuggestions,
        waitingSuggestions,
      });
    } else {
      const allSuggestions = await Suggestion.find({});
      const allCompletedSuggestions = await Suggestion.find({ status: 'Y' });
      const allWaitingSuggestions = await Suggestion.find({ status: 'N' });

      return res.render('myStarbucks', {
        title: 'myStarbucks',
        allSuggestions,
        allCompletedSuggestions,
        allWaitingSuggestions,
      });
    }
  },
};

// Post
export const process = {
  join: async (req, res) => {
    const { id, pwd, pwdCheck, name, gender, year, month, day, calendar, phone, email, nickname } =
      req.body;
    // 닉네임 중복 여부도 추가해보기
    const user = await User.findOne({ id });
    if (user) {
      return res.status(400).render('join', {
        title: 'join',
        msg: '이미 사용중인 아이디 입니다.',
      });
    }
    if (pwd !== pwdCheck) {
      return res.status(400).render('join', {
        title: 'join',
        msg: '비밀번호를 올바르게 입력해 주세요.',
      });
    }
    try {
      const birth = String(year) + String(month) + String(day) + calendar;
      const saltRounds = 10;
      const password = await bcrypt.hash(pwd, saltRounds);
      await User.create({
        id,
        pwd: password,
        name,
        gender,
        birth,
        phone,
        email,
        nickname,
      });
      return res.redirect('/user/login');
    } catch (err) {
      console.log(err);
      return res.status(400).render('join', {
        title: 'join',
        msg: 'Error.',
      });
    }
  },
  login: async (req, res) => {
    const { id, pwd } = req.body;
    try {
      const user = await User.findOne({ id });
      const password = await bcrypt.compareSync(pwd, user.pwd);
      if (!user) {
        return res.status(400).render('login', {
          title: 'login',
          msg: '존재하지 않는 아이디 입니다.',
        });
      } else if (!password) {
        return res.status(400).render('login', {
          title: 'login',
          msg: '비밀번호를 확인해 주세요.',
        });
      }
      req.session.user = user;
      return res.redirect('/');
    } catch (err) {
      console.log(err);
      return res.status(400).render('login', {
        title: 'login',
        msg: 'Error.',
      });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    return res.redirect('/');
  },
};
