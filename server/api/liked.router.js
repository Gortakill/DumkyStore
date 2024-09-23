import likedControler from "../controlers/liked.controler.js";
import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = Router()

router.post('/liked', AuthMiddleware, likedControler.addToLiked)
router.get('/liked', AuthMiddleware, likedControler.getLiked)
router.delete('/liked', AuthMiddleware, likedControler.deleteFromLiked)

export default router