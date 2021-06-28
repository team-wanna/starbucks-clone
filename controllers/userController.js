import bcrypt from 'bcrypt';
import User from '../models/User';
import Suggestion from '../models/Suggestion';

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
      req.flash('error', '이미 사용중인 아이디 입니다.');
      return res.status(400).redirect('/user/join');
    }
    if (pwd !== pwdCheck) {
      req.flash('error', '비밀번호를 올바르게 입력해 주세요.');
      return res.status(400).redirect('/user/join');
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
      if (!user) {
        req.flash('error', '존재하지 않는 아이디 입니다.');
        return res.status(400).redirect('/user/login'); // res.render로 하면 새로고침 시 플래시메세지가 캐시에 남아있습니다. redirect해야 캐시에 잡힌 메세지가 사라집니다!
      }
      const password = await bcrypt.compareSync(pwd, user.pwd); // user가 없을시 user.pwd가 undefind되어 에러 발생 ∴user 체크를 먼저 해야함!
      if (!password) {
        req.flash('error', '비밀번호를 확인해 주세요.');
        return res.status(400).redirect('/user/login');
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
