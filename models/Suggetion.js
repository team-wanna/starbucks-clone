import mongoose from 'mongoose';
import moment from 'moment';

const SuggetionSchema = new mongoose.Schema({
  writerId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String, required: true, default: moment().format('YYYY-MM-DD') },
  answeredAt: {
    type: String,
    requird: true,
    default: moment().add(7, 'days').format('YYYY-MM-DD'),
  },
  status: { type: String, required: true, default: 'N' },
  alarm: { type: Boolean, required: true },
  email: { type: String, required: true },
  phone: { type: String },
});

const suggetionModel = mongoose.model('Suggetion', SuggetionSchema);

export default suggetionModel;
