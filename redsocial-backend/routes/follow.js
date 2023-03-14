import express from 'express'
import {followCtrl} from '../controllers/follow.js'
import {verifyToken} from '../middlewares/auth.js'
export const router = express.Router()

router.get('/prueba-follow',followCtrl.Prueba)

router.post('/save',verifyToken,followCtrl.SaveFollow)
router.delete('/unfollow/:id',verifyToken,followCtrl.Unfollow)
router.get('/following/:id?/:page?',verifyToken,followCtrl.Following)
router.get('/followers/:id?/:page?',verifyToken,followCtrl.Followers)