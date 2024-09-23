import basketCatalog from "../controlers/basket.catalog.js";
import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = Router()

router.post('/basket', AuthMiddleware, basketCatalog.addToBasket)
router.get('/basket', AuthMiddleware, basketCatalog.getBasket)
router.delete('/basket', AuthMiddleware, basketCatalog.deleteFromBasket)

export default router