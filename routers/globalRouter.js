import express from 'express';
import { member } from '../middlewares';
import { output, process } from '../controllers/globalController';

const globalRouter = express.Router();

globalRouter.get('/', output.home);
globalRouter.route('/suggetion').get(member, output.suggetion).post(member, process.suggetion);
globalRouter.route('/:_id([0-9a-f]{24})').get(output.watch);
globalRouter.route('/:_id([0-9a-f]{24})/edit').get(member, output.edit).post(member, process.edit);
globalRouter.route('/:_id([0-9a-f]{24})/delete').get(member, output.delete);
export default globalRouter;
