import express from "express";
import { getallhhcData,getallznData,getpduserData } from "../controllers/search/search.js";



const router = express.Router();

router.get('/hhcdata/:id',getallhhcData)
router.get('/zndata/:id',getallznData)
router.get('/pduserdata/:id',getpduserData)


export default router;