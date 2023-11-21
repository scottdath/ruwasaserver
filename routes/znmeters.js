import { getallznData,gettotalData,updateDetails,deleteMeter,getznData } from "../controllers/pms/znpms.js";
import {register } from "../controllers/register/zonalreg.js";
import express from "express";

const router = express.Router();

router.get('/data',getallznData);
router.get('/data/:id',getznData);
router.get('/total',gettotalData);
router.post('/zonalreg',register);
router.put('/zonalupdate/:id',updateDetails)
router.delete('/zonaldel/:id',deleteMeter)

export default router;