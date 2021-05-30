import Suggetion from '../models/Suggetion';
import Answer from '../models/Answer';
import User from '../models/User';

// Get
export const output = {
  home: (req, res) => res.render('index', { title: 'index' }),
  suggetion: (req, res) => {
    let email = req.session.user.email;
    email = email.split('@');
    const emailId = email[0];
    const emailAddress = email[1];
    return res.render('suggetion', { title: 'suggetion', emailId, emailAddress });
  },
  edit: async (req, res) => {
    const { _id } = req.params;
    const suggetion = await Suggetion.findById(_id);
    const answer = await Answer.findOne({ suggestionId: _id });

    if (!suggetion) {
      console.log('Suggetion not found.');
      return res.render('user/my');
    }

    let { email, phone, alarm } = suggetion;
    email = email.split('@');
    const emailId = email[0];
    const emailAddress = email[1];
    phone = phone.split('-');
    const phone2 = phone[1];
    const phone3 = phone[2];

    let alarmN, alarmY;
    if (alarm) {
      alarmN = false;
      alarmY = true;
    } else {
      alarmN = true;
      alarmY = false;
    }

    return res.render('edit', {
      title: 'edit',
      suggetion,
      emailId,
      emailAddress,
      phone2,
      phone3,
      alarmN,
      alarmY,
      answer,
    });
  },
  watch: async (req, res) => {
    const { _id } = req.params;
    const suggetion = await Suggetion.findById(_id);
    const answer = await Answer.findOne({ suggestionId: _id });
    if (!suggetion) {
      console.log('Suggetion not found.');
      return res.render('user/my');
    }

    let { email, phone, alarm } = suggetion;
    email = email.split('@');
    const emailId = email[0];
    const emailAddress = email[1];
    phone = phone.split('-');
    const phone2 = phone[1];
    const phone3 = phone[2];

    let alarmN, alarmY;
    if (alarm) {
      alarmN = false;
      alarmY = true;
    } else {
      alarmN = true;
      alarmY = false;
    }

    return res.render('watch', {
      title: 'watch',
      suggetion,
      emailId,
      emailAddress,
      phone2,
      phone3,
      alarmN,
      alarmY,
      answer,
    });
  },
  delete: async (req, res) => {
    const { _id } = req.params;
    try {
      await Suggetion.findByIdAndDelete(_id);
      await Answer.findOneAndDelete({ suggestionId: _id });
    } catch (err) {
      console.log(err);
    } finally {
      return res.redirect('/user/my');
    }
  },
};

// Post
export const process = {
  suggetion: async (req, res) => {
    const { id } = req.session.user;
    const { alarm, mailId, mailAddress, phone1, phone2, phone3, title, content } = req.body;
    const email = `${mailId}@${mailAddress}`;
    const phone = phone2 && phone3 ? `${phone1}-${phone2}-${phone3}` : '';

    try {
      await Suggetion.create({
        writerId: id,
        title,
        content,
        alarm,
        email,
        phone,
      });
      return res.redirect('/user/my');
    } catch (err) {
      console.log(err);
      return res.redirect('/suggetion');
    }
  },
  edit: async (req, res) => {
    const { _id } = req.params;
    const { alarm, mailId, mailAddress, phone1, phone2, phone3, title, content } = req.body;
    const email = `${mailId}@${mailAddress}`;
    const phone = phone2 && phone3 ? `${phone1}-${phone2}-${phone3}` : '';
    try {
      await Suggetion.findByIdAndUpdate(_id, {
        title,
        content,
        alarm,
        email,
        phone,
      });
      return res.redirect('/user/my');
    } catch (err) {
      console.log(err);
      return res.redirect('/user/my');
    }
  },

  // answer
  createAnswer: async (req, res) => {
    const { suggestionId, contents } = req.body;
    try {
      const answer = await Answer.create({
        suggestionId,
        contents,
      });
      const suggestion = await Suggetion.findOneAndUpdate({ _id: suggestionId }, { status: 'Y' });
      answer.save();
      suggestion.save();
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      return res.status(400).redirect(`/`);
    }
  },
  patchAnswer: async (req, res) => {
    const { answerId, contents } = req.body;
    try {
      await Answer.findOneAndUpdate({ _id: answerId }, { contents });
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.status(400).redirect(`/`);
    }
  },
};
