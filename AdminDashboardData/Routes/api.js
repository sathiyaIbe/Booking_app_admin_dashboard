import { Router } from "express";
import Controller from '../Controller/adminDataController.js'
const router = Router()
router.get('/adminDatas', Controller.getAdminData)
router.get('/adminData/Data', Controller.countAdminDatas)
export default router