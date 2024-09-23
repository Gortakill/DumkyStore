import { Router } from "express";
import userControler from "../controlers/user.controler.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = Router()

router.post('/registration', userControler.registration)
router.post('/login', userControler.login)
router.patch('/update', AuthMiddleware, userControler.updateUser)

export default router