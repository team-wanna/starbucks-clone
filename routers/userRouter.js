import express from 'express';
import { output, process } from '../controllers/userController';
import { member, stranger } from '../middlewares';

const router = express.Router();

router.get('/join', stranger, output.join);
router.get('/login', stranger, output.login);
router.get('/my', member, output.my);
router.get('/logout', member, process.logout);

router.post('/join', stranger, process.join);
router.post('/login', stranger, process.login);

export default router;
