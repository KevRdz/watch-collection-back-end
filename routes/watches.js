import { Router } from "express";
import * as watchesCtrl from '../controllers/watches.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router()

//Public Routes
router.get('/', watchesCtrl.index)
//Protected Routes
router.use(decodeUserFromToken)
router.post('/', checkAuth, watchesCtrl.create)
router.delete('/:id', checkAuth, watchesCtrl.delete)
router.put('/:id', checkAuth, watchesCtrl.update)

export {
  router
}