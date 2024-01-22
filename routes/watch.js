import { Router } from "express";
import * watchCtrl from '../controllers/watch.js'
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js";

const router = Router()

//Public Routes

//Protected Routes
router.use(decodeUserFromToken)

export {
  router
}