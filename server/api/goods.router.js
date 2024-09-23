import goodsControler from "../controlers/goods.controler.js";
import { Router } from "express";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = Router()

router.post('/goods', checkRoleMiddleware('ADMIN'), goodsControler.createGood)
router.get('/goods', goodsControler.getGoods)
router.patch('/goods', checkRoleMiddleware('ADMIN'), goodsControler.updateGoods)
router.delete('/goods/delete', checkRoleMiddleware('ADMIN'), goodsControler.deleteGoods)

export default router