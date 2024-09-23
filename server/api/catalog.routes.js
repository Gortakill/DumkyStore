import catalogControler from "../controlers/catalog.controler.js";
import { Router } from "express";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const router = Router()

router.post('/catalog', checkRoleMiddleware('ADMIN'), catalogControler.createCatalog)
router.get('/catalog', catalogControler.getCatalogs)

export default router