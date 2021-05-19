export const member = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/user/login");
  } else {
    return next();
  }
};

export const stranger = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/user/my");
  } else {
    return next();
  }
};
