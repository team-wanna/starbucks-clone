import Suggestion from '../models/Suggestion.js';
import Answer from '../models/Answer.js';
import User from '../models/User.js';

// Get
export const output = {
  suggestion: (req, res) => {
    const email = req.session.user.email.split('@');
    const phone = req.session.user.phone.split('-');
    const userData = {
      emailId: email[0],
      emailAddress: email[1],
      phone2: phone[1],
      phone3: phone[2],
    };
    return res.render('suggestion', { title: 'suggestion', userData });
  },
  edit: async (req, res) => {
    const { _id } = req.params;
    const suggestion = await Suggestion.findById(_id);
    const answer = await Answer.findOne({ suggestionId: _id });

    if (!suggestion) {
      console.log('Suggestion not found.');
      return res.render('user/my');
    }

    let { email, phone, alarm } = suggestion;
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
      suggestion,
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
    const suggestion = await Suggestion.findById(_id);
    const answer = await Answer.findOne({ suggestionId: _id });
    if (!suggestion) {
      console.log('Suggestion not found.');
      return res.render('user/my');
    }

    let { email, phone, alarm } = suggestion;
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
      suggestion,
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
      await Suggestion.findByIdAndDelete(_id);
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
  suggestion: async (req, res) => {
    const { _id } = req.session.user;
    const { alarm, mailId, mailAddress, phone1, phone2, phone3, title, content } = req.body;
    const email = `${mailId}@${mailAddress}`;
    const phone = phone2 && phone3 ? `${phone1}-${phone2}-${phone3}` : '';

    try {
      const newSuggestion = await Suggestion.create({
        owner: _id,
        title,
        content,
        alarm,
        email,
        phone,
      });
      const user = await User.findById(_id);
      user.suggestions.push(newSuggestion._id);
      user.save();
      return res.redirect('/user/my');
    } catch (err) {
      console.log(err);
      return res.redirect('/suggestion');
    }
  },
  edit: async (req, res) => {
    const { _id } = req.params;
    const { alarm, mailId, mailAddress, phone1, phone2, phone3, title, content } = req.body;
    const email = `${mailId}@${mailAddress}`;
    const phone = phone2 && phone3 ? `${phone1}-${phone2}-${phone3}` : '';
    try {
      await Suggestion.findByIdAndUpdate(_id, {
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
      const suggestion = await Suggestion.findOneAndUpdate({ _id: suggestionId }, { status: 'Y' });
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
