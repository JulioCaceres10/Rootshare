import express from 'express';
import { body } from "express-validator";
import { dashboard, property, publicModels, sendMessage, showMessages } from '../controllers/publicController.js'
import authUser from '../middleware/authUser.js';

const router = express.Router()

router.get('/', dashboard)
router.get('/property/:id', authUser, property)
router.get('/models', publicModels)

router.post('/property/:id',
 authUser,
 body("message").isLength({ min: 15 }).withMessage("Mensaje invalido"),
 sendMessage
)
router.get('/messages/:id', authUser, showMessages)

export default router;