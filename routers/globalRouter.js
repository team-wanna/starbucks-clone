import express from 'express';

import { output } from '../controllers/globalController';

const globalRouter = express.Router();

globalRouter.get('/', output.home);

export default globalRouter;
