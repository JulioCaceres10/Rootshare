import express from "express";

// controladores
import {user, registerUser, confirmation, resetPassword, newPassword, validateToken, loginUser} from "../controllers/userController.js"

const router = express.Router();

router.get('/user', user)

router.post('/register', registerUser)
router.post('/login', loginUser)

router.put('/confirmation/:token', confirmation)

router.post('/reset/password', resetPassword)

router.put('/initialize/recovery/:token', newPassword )
router.get('/initialize/recovery/:token', validateToken  )

export default router;
