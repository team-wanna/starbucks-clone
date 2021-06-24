import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  birth: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  nickname: { type: String }, // null 허용 && 중복 불가 설정 알아보기
  isAdmin: {
    type: Boolean,
    default: false,
  },
  suggestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion' }],
});

const model = mongoose.model('User', UserSchema);

export default model;
