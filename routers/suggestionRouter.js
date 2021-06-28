import express from 'express';
import { member } from '../middlewares';
import { output, process } from '../controllers/suggestionController';

const suggestionRouter = express.Router();

suggestionRouter.route('/').get(member, output.suggestion).post(member, process.suggestion);
suggestionRouter.route('/:_id([0-9a-f]{24})').get(output.watch);
suggestionRouter
  .route('/:_id([0-9a-f]{24})/edit')
  .get(member, output.edit)
  .post(member, process.edit);
suggestionRouter.route('/:_id([0-9a-f]{24})/delete').get(member, output.delete);

// answer
suggestionRouter
  .route('/:_id([0-9a-f]{24})/answer')
  .post(process.createAnswer)
  .patch(process.patchAnswer);

export default suggestionRouter;
