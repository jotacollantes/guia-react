import express from 'express'
import {publicationCtrl} from '../controllers/publication.js'
export const router = express.Router()

router.get('/prueba-publication',publicationCtrl.Prueba)