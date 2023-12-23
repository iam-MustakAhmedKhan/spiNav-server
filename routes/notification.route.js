import { Router } from 'express';
import {createToken, notificationController} from '../controller/notification.controller.js';

const router = Router();

router.post('/send',notificationController);
router.post('/create',createToken);

export default router