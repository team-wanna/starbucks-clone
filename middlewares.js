export const member = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error', '로그인 시 이용 가능합니다.');
    return res.redirect('/user/login');
  } else {
    return next();
  }
};

export const stranger = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/user/my');
  } else {
    return next();
  }
};
