import express from 'express'
const router = express.Router()
import { getOverview } from '../controllers/salesController.js'

router.get('/overview', getOverview)


export default router