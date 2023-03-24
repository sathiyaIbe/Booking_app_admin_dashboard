import { Router } from "express"
import Controller from "../Controller/CabController.js"
const router = Router()
router.post('/cabRegister', Controller.cabRegister)
router.get('/cabRegister', Controller.getCabDetails)
export default router