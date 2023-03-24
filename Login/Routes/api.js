import { Router } from 'express'
import loginController from '../Controller/LoginController.js'
const router = Router();
router.post('/login', loginController.login)
export default router;