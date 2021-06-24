import express from 'express';
import { member } from '../middlewares';
import { output, process } from '../controllers/globalController';

const globalRouter = express.Router();

globalRouter.get('/', output.home);
globalRouter.route('/suggestion').get(member, output.suggestion).post(member, process.suggestion);
globalRouter.route('/suggestion/:_id([0-9a-f]{24})').get(output.watch);
globalRouter
  .route('/suggestion/:_id([0-9a-f]{24})/edit')
  .get(member, output.edit)
  .post(member, process.edit);
globalRouter.route('/suggestion/:_id([0-9a-f]{24})/delete').get(member, output.delete);

// answer
globalRouter
  .route('/suggestion/:_id([0-9a-f]{24})/answer')
  .post(process.createAnswer)
  .patch(process.patchAnswer);

export default globalRouter;
