import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  suggestionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Seggestion' },
  contents: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const model = mongoose.model('Answer', AnswerSchema);

export default model;
