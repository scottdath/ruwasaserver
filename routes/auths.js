import express from 'express'
import { login, logout, register,loginSession } from '../controllers/auths/auths.js'


const router = express.Router()

router.post("/login",login)
router.post("/logout",logout)
router.post("/register",register)
router.get("/login",loginSession)

// http://localhost:3001/api/auths/login 


export default router